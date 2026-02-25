import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { generateSidebar } from "vitepress-sidebar";

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

        // 为每个目录生成侧边栏
        sidebar[folderPath] = generateSidebar({
          documentRootPath: `/${srcDir}`,
          scanStartPath: folderName,
          resolvePath: folderPath,
          ...options,
        });
      }
    }
  } catch (e) {
    console.error("生成侧边栏时出错:", e);
  }

  return sidebar;
}

/**
 * 获取所有需要生成侧边栏的目录列表
 * @param {string} srcDir - 源文件目录
 * @returns {string[]} 目录名列表
 */
export function getSidebarFolders(srcDir) {
  const folders = [];
  const srcPath = join(process.cwd(), srcDir);

  try {
    const entries = readdirSync(srcPath, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        folders.push(entry.name);
      }
    }
  } catch (e) {
    console.error("读取目录时出错:", e);
  }

  return folders;
}
