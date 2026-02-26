import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { generateSidebar } from "vitepress-sidebar";

/**
 * 修复侧边栏链接，确保有前导斜杠
 */
function fixSidebarLinks(items, basePath) {
  return items.map((item) => {
    const newItem = { ...item };

    // 修复当前项的链接
    if (newItem.link) {
      // 确保链接以斜杠开头
      if (!newItem.link.startsWith("/")) {
        newItem.link = `${basePath}${newItem.link}`;
      }
      // 移除 .md 后缀
      if (newItem.link.endsWith(".md")) {
        newItem.link = newItem.link.slice(0, -3);
      }
      // 修复 index 链接
      if (newItem.link.endsWith("/index")) {
        newItem.link = newItem.link.slice(0, -5);
      }
    }

    // 递归修复子项
    if (newItem.items && newItem.items.length > 0) {
      newItem.items = fixSidebarLinks(newItem.items, basePath);
    }

    return newItem;
  });
}

/**
 * 读取目录下的 config.json（可选）
 * 支持示例：
 * { "title": "自定义标题" }
 * { "sidebarTitle": "自定义标题" }
 */
function readFolderConfig(folderAbsPath) {
  const configPath = join(folderAbsPath, "config.json");
  if (!existsSync(configPath)) {
    return null;
  }

  try {
    return JSON.parse(readFileSync(configPath, "utf-8"));
  } catch (e) {
    console.warn(`读取目录配置失败: ${configPath}`, e);
    return null;
  }
}

/**
 * 用目录配置覆盖生成后的侧边栏标题
 */
function applyFolderConfigToSidebar(items, folderConfig) {
  if (!Array.isArray(items) || items.length === 0 || !folderConfig) {
    return items;
  }

  const customTitle = folderConfig.sidebarTitle || folderConfig.title;
  if (!customTitle) {
    return items;
  }

  // vitepress-sidebar 通常会返回一个顶层分组，覆盖它的标题即可。
  if (items[0] && typeof items[0] === "object") {
    items[0] = { ...items[0], text: customTitle };
  }

  return items;
}

/**
 * 从侧边栏项链接推导目录绝对路径
 * 例如 /教程/子目录 -> <cwd>/src/教程/子目录
 */
function getFolderAbsPathFromSidebarLink(link, srcDir) {
  if (!link || typeof link !== "string") {
    return null;
  }

  let normalized = link;
  if (normalized.startsWith("/")) {
    normalized = normalized.slice(1);
  }
  if (normalized.endsWith(".md")) {
    normalized = normalized.slice(0, -3);
  }
  if (normalized.endsWith("/index")) {
    normalized = normalized.slice(0, -6);
  }

  // 空路径或根路径不处理
  if (!normalized) {
    return null;
  }

  return join(process.cwd(), srcDir, normalized);
}

/**
 * 根据侧边栏链接推导对应的 markdown 文件路径
 * - /教程/01-免责声明 -> <cwd>/src/教程/01-免责声明.md
 * - /教程/ -> <cwd>/src/教程/index.md
 * - /教程/子目录 -> <cwd>/src/教程/子目录/index.md (优先) 或 .md
 */
function getMdFilePathFromSidebarLink(link, srcDir) {
  if (!link || typeof link !== "string") {
    return null;
  }

  let normalized = link;
  if (normalized.startsWith("/")) {
    normalized = normalized.slice(1);
  }

  const rootAbs = join(process.cwd(), srcDir);
  if (!normalized) {
    const rootIndex = join(rootAbs, "index.md");
    return existsSync(rootIndex) ? rootIndex : null;
  }

  // 已是 .md 链接
  if (normalized.endsWith(".md")) {
    const mdPath = join(rootAbs, normalized);
    return existsSync(mdPath) ? mdPath : null;
  }

  // 路由路径：优先目录 index.md，其次同名 .md
  const asDirIndex = join(rootAbs, normalized, "index.md");
  if (existsSync(asDirIndex)) {
    return asDirIndex;
  }

  const asMd = join(rootAbs, `${normalized}.md`);
  if (existsSync(asMd)) {
    return asMd;
  }

  return null;
}

function readMdH1(mdPath) {
  if (!mdPath || !existsSync(mdPath)) {
    return null;
  }

  try {
    const lines = readFileSync(mdPath, "utf-8").split("\n");
    for (const rawLine of lines) {
      const line = rawLine.replace("\r", "");
      if (/^# /.test(line)) {
        return line.replace(/^# /, "").trim();
      }
    }
  } catch (e) {
    console.warn(`读取 Markdown H1 失败: ${mdPath}`, e);
  }

  return null;
}

/**
 * 递归用 Markdown H1 覆盖侧边栏标题（兜底）
 */
function applyMdH1Titles(items, srcDir) {
  if (!Array.isArray(items) || items.length === 0) {
    return items;
  }

  return items.map((item) => {
    if (!item || typeof item !== "object") {
      return item;
    }

    const nextItem = { ...item };

    if (nextItem.link) {
      const mdPath = getMdFilePathFromSidebarLink(nextItem.link, srcDir);
      const h1 = readMdH1(mdPath);
      if (h1) {
        nextItem.text = h1;
      }
    }

    if (Array.isArray(nextItem.items) && nextItem.items.length > 0) {
      nextItem.items = applyMdH1Titles(nextItem.items, srcDir);
    }

    return nextItem;
  });
}

/**
 * 递归为每个目录分组应用 config.json 标题覆盖
 */
function applyNestedFolderConfigs(items, srcDir) {
  if (!Array.isArray(items) || items.length === 0) {
    return items;
  }

  return items.map((item) => {
    if (!item || typeof item !== "object") {
      return item;
    }

    let nextItem = { ...item };

    if (Array.isArray(nextItem.items) && nextItem.items.length > 0) {
      nextItem.items = applyNestedFolderConfigs(nextItem.items, srcDir);

      const folderAbsPath = getFolderAbsPathFromSidebarLink(nextItem.link, srcDir);
      if (folderAbsPath) {
        const folderConfig = readFolderConfig(folderAbsPath);
        const customTitle = folderConfig?.sidebarTitle || folderConfig?.title;
        if (customTitle) {
          nextItem.text = customTitle;
        }
      }
    }

    return nextItem;
  });
}

/**
 * 自动扫描目录并生成多侧边栏配置
 * @param {string} srcDir - 源文件目录（相对于项目根目录）
 * @param {object} options - 侧边栏选项
 * @returns {object} 侧边栏配置对象
 */
export function generateMultiSidebar(srcDir, options = {}) {
  const sidebar = {};
  const srcPath = join(process.cwd(), srcDir);

  try {
    // 读取源目录下的所有子目录
    const entries = readdirSync(srcPath, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.isDirectory()) {
        const folderName = entry.name;
        const folderPath = `/${folderName}/`;
        const folderAbsPath = join(srcPath, folderName);

        // 跳过不需要生成侧边栏的目录
        if (folderName === "public" || folderName.startsWith(".")) {
          continue;
        }

        // 为每个目录生成侧边栏
        let generatedSidebar = generateSidebar({
          documentRootPath: `/${srcDir}`,
          scanStartPath: folderName,
          resolvePath: folderPath,
          // 默认使用 md 文件 H1 作为侧边栏文档标题（可被 options 覆盖）
          useTitleFromFileHeading: true,
          // 包含 index.md 文件
          includeFolderIndexFile: true,
          includeRootIndexFile: true,
          ...options,
        });

        // 确保生成的侧边栏是数组
        if (Array.isArray(generatedSidebar) && generatedSidebar.length > 0) {
          const folderConfig = readFolderConfig(folderAbsPath);
          // 修复链接格式
          generatedSidebar = fixSidebarLinks(generatedSidebar, folderPath);
          // 用 markdown 的 H1 作为标题兜底（目录项和文档项都支持）
          generatedSidebar = applyMdH1Titles(generatedSidebar, srcDir);
          // 递归支持更深层目录通过 config.json 自定义分组标题
          generatedSidebar = applyNestedFolderConfigs(generatedSidebar, srcDir);
          // 支持通过子目录 config.json 自定义侧边栏标题
          generatedSidebar = applyFolderConfigToSidebar(
            generatedSidebar,
            folderConfig,
          );
          sidebar[folderPath] = generatedSidebar;
        }
      }
    }
  } catch (e) {
    console.error("生成侧边栏时出错:", e);
  }

  return sidebar;
}
