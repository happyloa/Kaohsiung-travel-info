// AOS (Animate On Scroll) 初始化模組
// 只在客戶端載入，避免 SSR 問題
import AOS from "aos";

/**
 * 初始化 AOS 動畫
 * @param options - AOS 設定選項
 */
export function initAOS(options?: AOS.AosOptions) {
  AOS.init({
    duration: 600,
    easing: "ease-out-cubic",
    once: true,
    offset: 50,
    ...options,
  });
}
