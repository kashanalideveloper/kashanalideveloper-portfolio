// qa-blog-images.mjs — wait for all images, report broken ones, screenshot
export default async function run(page) {
  // scroll through the page so lazy images load
  await page.evaluate(async () => {
    await new Promise((res) => {
      let y = 0;
      const step = () => {
        y += 600;
        window.scrollTo(0, y);
        if (y < document.body.scrollHeight) setTimeout(step, 100);
        else {
          window.scrollTo(0, 0);
          setTimeout(res, 500);
        }
      };
      step();
    });
  });
  await page.waitForTimeout(2000);
  const report = await page.evaluate(() => {
    const imgs = [...document.querySelectorAll("img")];
    const broken = imgs
      .filter((i) => i.complete && i.naturalWidth === 0)
      .map((i) => i.currentSrc || i.src);
    const pending = imgs.filter((i) => !i.complete).length;
    return {
      total: imgs.length,
      broken: [...new Set(broken)],
      pendingCount: pending,
    };
  });
  return report;
}
