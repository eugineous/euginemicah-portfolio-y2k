/* EUGINE MICAH — site interactions */
(function () {
  'use strict';

  // Masthead background on scroll
  var mast = document.querySelector('.mast');
  if (mast) {
    var onScroll = function () {
      if (window.scrollY > 60) mast.classList.add('scrolled');
      else mast.classList.remove('scrolled');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Mobile menu — drawer toggle + animated burger + drawer CTA
  var burger = document.querySelector('.mast-burger');
  var nav = document.querySelector('.mast-nav');
  if (burger && nav) {
    // inject drawer CTA (Book + WhatsApp) at the bottom of the drawer
    if (!nav.querySelector('.drawer-cta')) {
      var cta = document.createElement('div');
      cta.className = 'drawer-cta';
      cta.innerHTML = '<a class="d-book" href="booking.html">Book Eugine</a>' +
                      '<a class="d-wa" href="mailto:eugine.micah@outlook.com">Email</a>';
      nav.appendChild(cta);
    }
    var closeDrawer = function () {
      nav.classList.remove('open'); burger.classList.remove('open');
      document.body.classList.remove('menu-open');
    };
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      burger.classList.toggle('open', open);
      document.body.classList.toggle('menu-open', open);
    });
    // close when a nav link is tapped
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        if (!a.classList.contains('d-wa')) closeDrawer();
      });
    });
    // close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) closeDrawer();
    });
    // close if the viewport grows back to desktop while the drawer is open
    var mq = window.matchMedia('(min-width: 1121px)');
    (mq.addEventListener ? mq.addEventListener.bind(mq, 'change') : mq.addListener.bind(mq))(function () {
      if (mq.matches && nav.classList.contains('open')) closeDrawer();
    });
  }

  // Mobile bottom action bar (Menu · Feed · Book · WhatsApp)
  if (!document.querySelector('.m-actionbar')) {
    var bar = document.createElement('nav');
    bar.className = 'm-actionbar';
    bar.setAttribute('aria-label', 'Quick actions');
    bar.innerHTML =
      '<button class="ab-menu" aria-label="Menu"><span class="ic">☰</span><span>Menu</span></button>' +
      '<a href="feed.html"><span class="ic">▦</span><span>Feed</span></a>' +
      '<a class="ab-book" href="booking.html"><span class="ic">★</span><span>Book</span></a>' +
      '<a class="ab-wa" href="mailto:eugine.micah@outlook.com"><span class="ic">✉</span><span>Email</span></a>';
    document.body.appendChild(bar);
    var abMenu = bar.querySelector('.ab-menu');
    if (abMenu && burger) abMenu.addEventListener('click', function () { burger.click(); });
  }

  // Reveal on scroll
  var rvs = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window && rvs.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -80px 0px' });
    rvs.forEach(function (el) { io.observe(el); });

    // Safety net: reveal anything above the fold immediately, and force-reveal
    // everything still hidden shortly after load so content can never get stuck.
    var revealInView = function () {
      rvs.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < (window.innerHeight || 800)) el.classList.add('in');
      });
    };
    revealInView();
    window.addEventListener('load', revealInView);
    setTimeout(function () { rvs.forEach(function (el) { el.classList.add('in'); }); }, 1600);
  } else {
    rvs.forEach(function (el) { el.classList.add('in'); });
  }

  // ── Reels: lazy in-view playback ──
  // Videos tagged [data-reelplay] only play while on screen (saves bandwidth,
  // survives autoplay blocking). If the browser refuses, retry on first tap/scroll.
  var reels = [].slice.call(document.querySelectorAll('video[data-reelplay]'));
  if (reels.length) {
    reels.forEach(function (v) { v.muted = true; });
    var tryPlay = function (v) {
      var p = v.play();
      if (p && p.catch) p.catch(function () { v.setAttribute('data-reel-blocked', ''); });
    };
    var retryBlocked = function () {
      reels.forEach(function (v) {
        if (v.hasAttribute('data-reel-blocked') && v.hasAttribute('data-reel-inview')) {
          v.removeAttribute('data-reel-blocked'); tryPlay(v);
        }
      });
    };
    ['pointerdown', 'touchstart', 'keydown', 'scroll'].forEach(function (ev) {
      window.addEventListener(ev, retryBlocked, { passive: true, once: false });
    });
    if ('IntersectionObserver' in window) {
      var vio = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          var v = e.target;
          if (e.isIntersecting) { v.setAttribute('data-reel-inview', ''); tryPlay(v); }
          else { v.removeAttribute('data-reel-inview'); if (!v.paused) v.pause(); }
        });
      }, { rootMargin: '120px 0px' });
      reels.forEach(function (v) { vio.observe(v); });
    } else {
      reels.forEach(function (v) { v.setAttribute('data-reel-inview', ''); tryPlay(v); });
    }
  }

  // ── Auto-archive past tour dates ──
  // Rows whose [data-cal] date is before today get .past, a "Past" label,
  // and sink to the bottom of their list so "Upcoming" stays honest.
  (function () {
    var today = new Date();
    var stamp = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    var rows = [].slice.call(document.querySelectorAll('.date-row .dr-date[data-cal]'));
    rows.forEach(function (d) {
      var when = parseInt(d.getAttribute('data-cal').slice(0, 8), 10);
      if (when < stamp) {
        var row = d.closest('.date-row');
        if (!row || row.classList.contains('past')) return;
        row.classList.add('past');
        var cta = row.querySelector('.dr-cta');
        if (cta) { var s = document.createElement('span'); s.className = 'dr-cta'; s.textContent = 'Past'; cta.replaceWith(s); }
        row.parentNode.appendChild(row);
      }
    });
  })();

  // Smooth anchor scroll
  var topBtn = document.createElement('button');
  topBtn.className = 'to-top';
  topBtn.setAttribute('aria-label', 'Back to top');
  topBtn.innerHTML = '<span class="tt-label">Top</span>';
  document.body.appendChild(topBtn);
  var onScrollTop = function () {
    if (window.scrollY > 600) topBtn.classList.add('show');
    else topBtn.classList.remove('show');
  };
  onScrollTop();
  window.addEventListener('scroll', onScrollTop, { passive: true });
  topBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ── Lightbox for feed/gallery photo tiles ──
  var igLinks = [].slice.call(document.querySelectorAll('.ig-tile, .gal'));
  // collect ones that contain an <img> (skip pure video reels)
  var items = igLinks.filter(function (a) { return a.querySelector('img'); });
  if (items.length) {
    var lb = document.createElement('div');
    lb.className = 'lb';
    lb.innerHTML =
      '<button class="lb-close" aria-label="Close">×</button>' +
      '<button class="lb-nav lb-prev" aria-label="Previous">‹</button>' +
      '<button class="lb-nav lb-next" aria-label="Next">›</button>' +
      '<div class="lb-inner"><img alt="Eugine Micah"><div class="lb-bar">' +
      '<span class="lb-count" style="font-family:var(--f-black);font-size:13px;letter-spacing:.06em;color:#fff;opacity:.8;"></span>' +
      '<a class="lb-ig" target="_blank" rel="noopener" href="https://instagram.com/eugine.micah">View on Instagram ↗</a></div></div>';
    document.body.appendChild(lb);
    var lbImg = lb.querySelector('img');
    var lbCount = lb.querySelector('.lb-count');
    var idx = 0;
    function show(i) {
      idx = (i + items.length) % items.length;
      var src = items[idx].querySelector('img').getAttribute('src');
      lbImg.src = src;
      if (lbCount) lbCount.textContent = (idx + 1) + ' / ' + items.length;
      lb.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function close() { lb.classList.remove('open'); document.body.style.overflow = ''; lbImg.src = ''; }
    items.forEach(function (a, i) {
      a.addEventListener('click', function (e) { e.preventDefault(); show(i); });
    });
    lb.querySelector('.lb-close').addEventListener('click', close);
    lb.querySelector('.lb-prev').addEventListener('click', function (e) { e.stopPropagation(); show(idx - 1); });
    lb.querySelector('.lb-next').addEventListener('click', function (e) { e.stopPropagation(); show(idx + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') show(idx + 1);
      else if (e.key === 'ArrowLeft') show(idx - 1);
    });
  }
})();
