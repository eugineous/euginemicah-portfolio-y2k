/* ============================================================
   EUGINE MICAH — SYSTEMS LAYER
   Forms · Newsletter · Checkout · Calendar · Share · Feeds
   ------------------------------------------------------------
   ► EDIT THIS ONE BLOCK to go live. Until then everything
     falls back gracefully (forms open the mail app, shop opens
     a reservation email, etc.) so the site works immediately.
   ============================================================ */
window.EM_CONFIG = {
  // 1) FORMS + NEWSLETTER — delivered to your inbox via FormSubmit (no account needed).
  //    The FIRST submission emails you a one-time activation link — click it once and
  //    every form on the site delivers forever. To switch to Web3Forms instead,
  //    paste an access key below (it then takes priority).
  formsubmitEmail: "eugine.micah@outlook.com",
  web3formsKey: "",            // e.g. "a1b2c3d4-...."  (optional — overrides FormSubmit)

  // 2) NEWSLETTER (optional dedicated list) — Mailchimp/MailerLite form action URL
  newsletterAction: "",        // leave "" to route through web3forms / mail

  // 3) SHOP CHECKOUT — Paystack public key (paystack.com, supports M-Pesa + card)
  paystackKey: "",             // e.g. "pk_live_...."  (leave "" to use reserve-by-email)
  currency: "KES",

  // 4) CONTACT
  email: "eugine.micah@outlook.com",
  whatsapp: "",                // intentionally blank — phone stays off the site

  // 5) VIDEO — YouTube video OR playlist id for the Watch reel
  youtubeVideoId: "",          // e.g. "dQw4w9WgXcQ"
  youtubeChannel: "urbannewsgang"
};

(function () {
  'use strict';
  var C = window.EM_CONFIG;

  /* ---------- helpers ---------- */
  function feedback(form, msg, ok) {
    var el = form.querySelector('[data-result]');
    if (!el) { el = document.createElement('div'); el.setAttribute('data-result',''); form.appendChild(el); }
    el.textContent = msg;
    el.style.cssText = 'display:block;margin-top:16px;font-family:var(--f-black);font-size:13px;text-transform:uppercase;letter-spacing:.04em;color:' + (ok ? 'var(--cyan)' : 'var(--pink)') + ';';
  }
  function mailFallback(data, subject) {
    var body = Object.keys(data).map(function (k) { return k + ': ' + data[k]; }).join('\n');
    window.location.href = 'mailto:' + C.email + '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(body);
  }
  // POST to whichever form backend is configured. Resolves true on success.
  function sendForm(data, subject) {
    var url, payload;
    if (C.web3formsKey) {
      url = 'https://api.web3forms.com/submit';
      payload = Object.assign({}, data, { access_key: C.web3formsKey, subject: subject, from_name: data.name || 'Website visitor' });
    } else if (C.formsubmitEmail) {
      url = 'https://formsubmit.co/ajax/' + C.formsubmitEmail;
      payload = Object.assign({}, data, { _subject: subject, _template: 'table', _captcha: 'false' });
    } else {
      return Promise.reject(new Error('no backend'));
    }
    return fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(payload)
    }).then(function (r) { return r.json(); }).then(function (res) {
      var ok = res.success === true || res.success === 'true';
      if (!ok) throw new Error(res.message || 'failed');
      return res;
    });
  }

  /* ---------- 1) GENERIC FORMS (booking, contact) ---------- */
  document.querySelectorAll('form[data-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('[type=submit]');
      var data = {};
      new FormData(form).forEach(function (v, k) { data[k] = v; });
      var subject = 'Website · ' + (form.getAttribute('data-form') || 'Inquiry') +
                    (data.name ? ' · ' + data.name : '');

      if (!C.web3formsKey && !C.formsubmitEmail) { mailFallback(data, subject); feedback(form, '★ Opening your mail app…', true); return; }

      if (btn) { btn.dataset.label = btn.textContent; btn.textContent = 'Sending…'; }

      sendForm(data, subject).then(function () {
        form.reset();
        if (btn) btn.textContent = 'Sent ✦';
        feedback(form, '★ Got it. The team will be in touch.', true);
      }).catch(function () {
        if (btn && btn.dataset.label) btn.textContent = btn.dataset.label;
        mailFallback(data, subject);
        feedback(form, '★ Opening your mail app…', true);
      });
    });
  });

  /* ---------- 2) NEWSLETTER ---------- */
  document.querySelectorAll('form[data-news]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('[type=submit]');
      var data = {}; new FormData(form).forEach(function (v, k) { data[k] = v; });

      if (C.newsletterAction) {
        // hand off to provider form action (Mailchimp etc.)
        form.setAttribute('action', C.newsletterAction);
        form.setAttribute('method', 'post');
        form.submit(); return;
      }
      if (C.web3formsKey || C.formsubmitEmail) {
        sendForm(data, 'Newsletter signup · ' + (data.email || '')).catch(function () {});
      }
      form.reset();
      if (btn) btn.textContent = "You're in ✦";
      var doneNote = form.querySelector('.news-done');
      if (doneNote) { doneNote.style.display = 'block'; }
      else { feedback(form, '★ Welcome to the gang.', true); }
    });
  });

  /* ---------- 3) SHOP CHECKOUT (Paystack) ---------- */
  function loadPaystack(cb) {
    if (window.PaystackPop) return cb();
    var s = document.createElement('script');
    s.src = 'https://js.paystack.co/v1/inline.js';
    s.onload = cb; s.onerror = cb;
    document.head.appendChild(s);
  }
  document.querySelectorAll('[data-buy]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      var name = el.getAttribute('data-buy');
      var price = parseInt(el.getAttribute('data-price') || '0', 10); // in KES
      if (!C.paystackKey) {
        e.preventDefault();
        window.location.href = 'mailto:' + C.email + '?subject=' +
          encodeURIComponent('Order · ' + name) + '&body=' +
          encodeURIComponent("I'd like to order: " + name + (price ? ' (KSh ' + price.toLocaleString() + ')' : '') + '\n\nName:\nPhone:\nDelivery address:');
        return;
      }
      e.preventDefault();
      loadPaystack(function () {
        if (!window.PaystackPop) { window.location.href = 'mailto:' + C.email; return; }
        var email = window.prompt('Your email for the receipt:');
        if (!email) return;
        window.PaystackPop.setup({
          key: C.paystackKey, email: email,
          amount: price * 100, currency: C.currency,
          metadata: { custom_fields: [{ display_name: 'Item', variable_name: 'item', value: name }] },
          callback: function () { alert('Payment complete. Thank you! You will receive a confirmation shortly.'); },
          onClose: function () {}
        }).openIframe();
      });
    });
  });

  /* ---------- 4) ADD TO CALENDAR (.ics download) ---------- */
  document.querySelectorAll('[data-cal]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      var t = el.getAttribute('data-cal');          // "YYYYMMDD" or "YYYYMMDDTHHMMSS"
      var title = el.getAttribute('data-cal-title') || 'Eugine Micah';
      var loc = el.getAttribute('data-cal-loc') || 'Kenya';
      var dt = t.slice(0, 8);
      // all-day events: DTEND is exclusive, so end = start + 1 day
      var d = new Date(Date.UTC(+dt.slice(0,4), +dt.slice(4,6) - 1, +dt.slice(6,8) + 1));
      var end = d.getUTCFullYear() + ('0' + (d.getUTCMonth() + 1)).slice(-2) + ('0' + d.getUTCDate()).slice(-2);
      var ics = ['BEGIN:VCALENDAR','VERSION:2.0','BEGIN:VEVENT',
        'DTSTART;VALUE=DATE:' + dt, 'DTEND;VALUE=DATE:' + end,
        'SUMMARY:' + title, 'LOCATION:' + loc,
        'DESCRIPTION:Eugine Micah · euginemicah.tech', 'END:VEVENT','END:VCALENDAR'].join('\r\n');
      var blob = new Blob([ics], { type: 'text/calendar' });
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob); a.download = title.replace(/\s+/g,'-') + '.ics';
      a.click();
    });
  });

  /* ---------- 5) SHARE ---------- */
  document.querySelectorAll('[data-share]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      var url = el.getAttribute('data-share-url') || window.location.href;
      var title = el.getAttribute('data-share-title') || document.title;
      if (navigator.share) { navigator.share({ title: title, url: url }).catch(function(){}); }
      else {
        var w = 'https://wa.me/?text=' + encodeURIComponent(title + ' ' + url);
        window.open(w, '_blank');
      }
    });
  });

  /* ---------- 6) WATCH REEL ---------- */
  var reelCover = document.getElementById('reel-cover');
  var reelFrame = document.getElementById('reel-frame');
  if (reelCover && reelFrame) {
    reelCover.addEventListener('click', function () {
      var src = C.youtubeVideoId
        ? 'https://www.youtube.com/embed/' + C.youtubeVideoId + '?autoplay=1&rel=0'
        : 'https://www.youtube.com/embed?listType=user_uploads&list=' + C.youtubeChannel + '&autoplay=1';
      reelFrame.src = src;
      reelCover.style.display = 'none';
    });
  }
})();
