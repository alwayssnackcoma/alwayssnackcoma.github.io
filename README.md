# 잠깐 나올래

3분의 창작 휴대폰 이야기. 실제 메시지·전화·SNS 계정과 연결되지 않습니다.

## 실행

Node.js 22.13 이상에서 `npm install` 후 `npm run dev`.
`npm run build`로 `github-dist/`를 만들고 `npm run preview`로 확인합니다.

## 대화

키워드와 직전 대화에 따라 정해진 문장을 표시합니다. AI, API 키, 서버, 데이터베이스를 사용하지 않습니다.
첫 이동혁 대화를 열고 180초가 지나거나 15번째 답장이 나오면 전화 화면으로 넘어갑니다.
전화를 받거나 걸면 제공된 음성 약 6초가 재생되고 종료됩니다.
대화는 현재 탭 메모리에만 남으며 새로고침하면 초기화됩니다.

답장 수정: `app/story-dialogue.ts`의 키워드·답장 목록.

## GitHub Pages

`main`에 올리면 `.github/workflows/pages.yml`이 빌드하고 배포합니다.
저장소 Settings → Pages → Source를 GitHub Actions로 설정합니다.
이 저장소는 `alwayssnackcoma.github.io` 사용자 사이트 기준이며 루트 경로를 사용합니다.

커스텀 도메인은 Pages 배포를 확인한 뒤 연결합니다.
현재 DNS 대상은 도메인 관리 업체에서 변경해야 합니다.

제공된 사진과 음성을 포함합니다. 이 창작 이야기에서만 사용하는 자료이며 재배포 권한을 부여하지 않습니다.
