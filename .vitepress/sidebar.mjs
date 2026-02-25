import { readdirSync } from "node:fs";
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

        // 跳过不需要生成侧边栏的目录
        if (folderName === "public" || folderName.startsWith(".")) {
          continue;
        }

        // 为每个目录生成侧边栏
        let generatedSidebar = generateSidebar({
          documentRootPath: `/${srcDir}`,
          scanStartPath: folderName,
          resolvePath: folderPath,
          // 包含 index.md 文件
          includeFolderIndexFile: true,
          includeRootIndexFile: true,
          ...options,
        });

        // 确保生成的侧边栏是数组
        if (Array.isArray(generatedSidebar) && generatedSidebar.length > 0) {
          // 修复链接格式
          generatedSidebar = fixSidebarLinks(generatedSidebar, folderPath);
          sidebar[folderPath] = generatedSidebar;
        }
      }
    }
  } catch (e) {
    console.error("生成侧边栏时出错:", e);
  }

  return sidebar;
}
