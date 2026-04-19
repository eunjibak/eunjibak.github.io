# eunjibak.github.io

박은지 포트폴리오 사이트.

## 배포 방법 (GitHub Pages)

1. GitHub에 `eunjibak.github.io` 이름으로 저장소 생성 (이미 있다면 스킵)
2. 이 폴더의 모든 파일을 저장소 root에 push
   ```bash
   git init
   git add .
   git commit -m "initial: agentcat case page"
   git branch -M main
   git remote add origin https://github.com/eunjibak/eunjibak.github.io.git
   git push -u origin main
   ```
3. GitHub 저장소 → Settings → Pages → Source: `main` branch / `/ (root)` 선택
4. 1~2분 후 `https://eunjibak.github.io` 에서 접속 가능

## 폴더 구조

```
eunjibak.github.io/
├── index.html              ← 홈: 소개 + 케이스 카드
├── cases/
│   └── agentcat/
│       └── index.html      ← agentcat 케이스 상세
├── assets/
│   ├── css/styles.css      ← 공통 스타일
│   └── images/agentcat/    ← 이미지 자리 (현재 비어있음)
└── README.md
```

## 이미지 채우는 방법

agentcat 케이스 페이지에는 이미지 자리가 점선 박스로 표시되어 있습니다.
실제 이미지를 넣으려면:

1. 이미지 파일을 `assets/images/agentcat/` 폴더에 추가 (예: `morning-briefing.png`)
2. `cases/agentcat/index.html` 에서 해당 placeholder 블록을 찾아서:

   **이렇게 되어 있는 부분을:**
   ```html
   <figure class="image-placeholder narrow">
     <div class="image-placeholder-icon">📱</div>
     <div class="image-placeholder-label">아침 브리핑 실제 캡처</div>
     <div class="image-placeholder-caption">텔레그램 화면</div>
   </figure>
   ```

   **이렇게 바꿉니다:**
   ```html
   <figure>
     <img src="../../assets/images/agentcat/morning-briefing.png" alt="아침 브리핑 실제 캡처" style="max-width:320px;margin:32px auto;display:block;border-radius:8px;border:1px solid var(--line);">
     <figcaption style="text-align:center;font-size:13px;color:var(--ink-muted);margin-top:8px;">아침 브리핑 — 텔레그램 화면</figcaption>
   </figure>
   ```

   가로형 이미지(차트, 다이어그램)는 `narrow` 클래스 없는 placeholder를 찾아 같은 방식으로 교체.

## 케이스 추가하는 방법

새 케이스(예: 가계부 에이전트)를 추가할 때:

1. `cases/budget-agent/index.html` 생성 (agentcat 페이지 복사 후 내용 교체)
2. `index.html` 의 `<!-- 향후 케이스 추가 위치 -->` 부분에 카드 한 개 추가:

```html
<a href="cases/budget-agent/" class="case-card">
  <div class="case-card-grid">
    <div class="case-num">02 / 2026</div>
    <div class="case-body">
      <h3 class="case-title">…</h3>
      <p class="case-desc">…</p>
      <div class="case-tags">
        <span class="case-tag">…</span>
      </div>
    </div>
    <div class="case-arrow" aria-hidden="true">→</div>
  </div>
</a>
```

## 디자인 토큰

색·폰트·여백을 바꾸려면 `assets/css/styles.css` 상단의 `:root { --bg: ... }` 부분만 수정하면 사이트 전체에 반영됩니다.

- `--accent`: 포인트 색 (현재: warm clay `#c25b3f`)
- `--bg`: 배경 (현재: 따뜻한 오프화이트)
- 본문 폰트: Pretendard (한국어)
- 디스플레이 폰트: Fraunces (제목·강조)
