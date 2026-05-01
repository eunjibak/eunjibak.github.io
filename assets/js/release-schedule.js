/* eunjibak.github.io — release schedule gate
 *
 * Single source of truth for per-post unlock dates (KST 08:00).
 * Used by listing pages (applyGate) and detail pages (enforceGate).
 */
(function () {
  // ISO 8601 with +09:00 offset = KST. Already-public posts use a past date.
  var SCHEDULE = {
    'writing/tag-to-raw':          '2026-04-28T00:00:00+09:00',
    'writing/fixed-to-dynamic':    '2026-05-08T08:00:00+09:00',
    'writing/agent-identity':      '2026-05-15T08:00:00+09:00',
    'writing/intervention-policy': '2026-05-22T08:00:00+09:00',
    'writing/welcoming-design':    '2026-05-29T08:00:00+09:00',

    'dev-log/100-days':            '2026-04-28T00:00:00+09:00',
    'dev-log/design-principles':   '2026-05-08T08:00:00+09:00',
    'dev-log/daily-loop':          '2026-05-15T08:00:00+09:00',
    'dev-log/review-1':            '2026-05-22T08:00:00+09:00',
    'dev-log/personal-tuning':     '2026-05-29T08:00:00+09:00'
  };

  var DAY_MS = 86400000;
  var KST_OFFSET_MS = 9 * 60 * 60 * 1000;

  // Whole-day diff in the KST calendar. On 2026-05-01 vs release 2026-05-08T08:00 -> 7.
  function daysUntilKst(releaseDate, now) {
    var todayKstDay = Math.floor((now.getTime() + KST_OFFSET_MS) / DAY_MS);
    var releaseKstDay = Math.floor((releaseDate.getTime() + KST_OFFSET_MS) / DAY_MS);
    return releaseKstDay - todayKstDay;
  }

  function getStatus(slug, now) {
    now = now || new Date();
    var iso = SCHEDULE[slug];
    if (!iso) return { unlocked: true, label: null };
    var release = new Date(iso);
    if (now.getTime() >= release.getTime()) {
      return { unlocked: true, label: null };
    }
    return { unlocked: false, label: 'D-' + daysUntilKst(release, now) };
  }

  function applyGate(root) {
    root = root || document;
    var cards = root.querySelectorAll('.case-card[data-slug]');
    for (var i = 0; i < cards.length; i++) {
      var card = cards[i];
      var slug = card.getAttribute('data-slug');
      var status = getStatus(slug);
      if (status.unlocked) continue;
      card.classList.add('is-locked');
      card.setAttribute('aria-disabled', 'true');
      card.setAttribute('tabindex', '-1');
      card.removeAttribute('href');
      var arrow = card.querySelector('.case-arrow');
      if (arrow) {
        arrow.textContent = status.label;
        arrow.classList.add('case-countdown');
      }
    }
  }

  function enforceGate(slug) {
    var status = getStatus(slug);
    if (status.unlocked) return;
    var section = slug.split('/')[0];
    window.location.replace('/' + section + '/');
  }

  window.ReleaseSchedule = {
    SCHEDULE: SCHEDULE,
    getStatus: getStatus,
    applyGate: applyGate,
    enforceGate: enforceGate
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { applyGate(); });
  } else {
    applyGate();
  }
})();
