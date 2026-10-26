/* Optional YouTube video for each programme detail page.
   Add a YouTube URL to data-video-url in that page's [data-programme-video] section.
   Leave it empty to keep the section hidden. */
(function () {
  const section = document.querySelector('[data-programme-video]');
  if (!section) return;
  const rawUrl = (section.getAttribute('data-video-url') || '').trim();
  if (!rawUrl) return;
  let videoId = '';
  try {
    const url = new URL(rawUrl);
    const host = url.hostname.replace(/^www\./, '').toLowerCase();
    if (host === 'youtu.be') videoId = url.pathname.split('/').filter(Boolean)[0] || '';
    else if (host === 'youtube.com' || host === 'm.youtube.com' || host === 'youtube-nocookie.com') {
      videoId = url.searchParams.get('v') || '';
      if (!videoId) { const match = url.pathname.match(/^\/(?:embed|shorts|live)\/([^/]+)/); if (match) videoId = match[1]; }
    }
  } catch (error) { return; }
  if (!/^[A-Za-z0-9_-]{11}$/.test(videoId)) return;
  const frame = section.querySelector('[data-programme-video-frame]');
  if (!frame) return;
  frame.src = 'https://www.youtube-nocookie.com/embed/' + videoId;
  section.hidden = false;
})();
