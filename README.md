
**🔴 해당 프로젝트는 스마트폰 화면에 최적화 되어 있습니다.**

# 농협생명 사원 대상 당뇨 관리 리포트

---
<div align="center">
    <img src="https://github.com/user-attachments/assets/53177c3c-da22-4bf2-a40d-cde5c2f038f4" alt="Project Logo" width="500">
</div>

> **개인 프로젝트**  
> 개발기간: 6주 (2024.05.12 ~ 06.23)  
> 유지보수: 3주 (2024.06.24 ~ 09.15)

---

## 배포주소
(STOP)http://nonghyuphealthcare-react.s3-website.ap-northeast-2.amazonaws.com/login
테스트 아이디 : test  
테스트 비밀번호 : 123
---

## 프로젝트 소개

농협생명 사원 15명을 대상으로, 검사/설명 데이터를 통해 당뇨 등급을 분류하고, 등급에 맞는 교육 자료를 제공하는 사이트입니다.  
관리자가 교육자료를 관리자페이지를 통해 업데이트하고, 이를 사원들이 알림페이지를 통해 확인하도록 설계되었습니다.

---
# 주요 화면

| 페이지 | 설명                          | 페이지 | 설명                          |
|------|-------------------------------|------|-------------------------------|
| 1. 메인페이지(다크모드)             | ![1_main(black)](https://github.com/user-attachments/assets/cf987972-2e34-4b8c-a6da-d09d89c79613) | 2. 메인페이지(라이트모드)       | ![1_main(white)](https://github.com/user-attachments/assets/958faa96-3197-47b3-83bf-85bfd496b0cd) |
| 3. 알림 및 공지사항                 | ![2_알림및공지사항](https://github.com/user-attachments/assets/8ec615dc-42aa-416d-b5e4-c1638b6e82cb) | 4. 세부 알림 확인(단일 이미지)  | ![3_세부이미지확인](https://github.com/user-attachments/assets/c8b75a9c-fa5b-4517-861b-8eff765fef48) |
| 5. 세부 알림 확인(복수 이미지)      | ![3_이미지가여러장일경우캐러셀사용](https://github.com/user-attachments/assets/c0321afb-6fe6-47e0-b7fd-126c502adea1) | 6. 포인트 적립 내역 확인        | ![4_포인트적립내역확인](https://github.com/user-attachments/assets/5809b0a2-3593-4a60-b16a-5e8224d4e509) |
| 7. 클릭시 코끼리점프                 | ![5점프하는코끼리](https://github.com/user-attachments/assets/5c8e52c0-526e-4755-9062-971eda6aba26) | 8. 관리자페이지(공지사항 등록)   | ![9-1_관리자페이지(정기메시지전송)](https://github.com/user-attachments/assets/3e0e053d-2793-4249-bb2a-53dbccaa3d37) |
| 9. 관리자페이지(알림 등록)          | ![9-2_관리자페이지(비정기메시지전송)](https://github.com/user-attachments/assets/25cb1c16-bbbc-4124-807d-89d7c098471a) | 10. 로그인                     | ![0_login](https://github.com/user-attachments/assets/04e747d0-6c06-492c-b16a-2fa2c67b3b24) |

---

# 개발 주요 사항

- **고객 요구사항 분석**: 농협생명 담당자와 회원들의 실질적 요구사항을 수집하여 Figma로 설계.
- **Spring Boot REST API** 기반 서버 개발.
- **AWS 서비스 활용**:
  - **EC2**: 배포 및 서버 환경 구성.
  - **S3**: 데이터 및 파일 저장소.
  - **CodeDeploy**: CI/CD 파이프라인 구축.
- **효율적 데이터 처리**: JPA의 `Fetch Join`과 `Batch Size`로 **N+1 문제** 해결.

---

# 사용 기술

| **프론트엔드**     | **백엔드**         | **데이터베이스** | **인프라**      |
|------------------|------------------|--------------|---------------|
| React, TailwindCSS | Spring Boot, JPA | MySQL        | AWS, CodeDeploy, S3 |

---

# 개발 관련 설명
실 서비스되는 웹 개발을 시도해보며 실제 현업에서 수행하는 소프트웨어 개발 생명 주기 전 과정을 몸소 느낄 수 있었습니다. 
개발부터 CI/CD, 운영 및 클라이언트의 지속적인 요구사항 변경 등 다양한 문제에 부딪히고 해결해 나가는 과정에서 저도 함께 성장하는 것을 느낄 수 있었습니다. 
실제 사용자가 있는 만큼 서버 다운타임을 최소화하기 위해 AWS Cloud Watch를 통한 서버 이상시 메일 알람과 같은 각별한 주의를 기울인 프로젝트였습니다. 
돌이켜 생각해 보면, 장애 발생시 복구될 수 있도록 AutoScailing을 트리거했다면 더 좋았을 것이라고 생각합니다.

---

# 디렉토리 구조

```bash
src
├── main
│   ├── java                    # Java 백엔드 코드
│   │   ├── bloodSugar          # 혈당 관련 비즈니스 로직
│   │   │   ├── controller      # 혈당 컨트롤러
│   │   │   ├── repository      # 혈당 데이터 접근 계층
│   │   │   └── service         # 혈당 서비스 계층
│   │   ├── event
│   │   │   ├── controller      # 이벤트 컨트롤러
│   │   │   ├── dto             # 이벤트 DTO (Data Transfer Objects)
│   │   │   ├── entity          # 이벤트 엔티티 클래스
│   │   │   ├── repository      # 이벤트 저장소
│   │   │   └── service         # 이벤트 서비스 계층
│   │   ├── security
│   │   │   ├── JwtRequestFilter.java # JWT 필터
│   │   │   ├── JwtUtil.java         # JWT 유틸리티 클래스
│   │   │   └── WebSecurityConfig.java # Spring Security 설정
│   │   └── user
│   │       ├── controller      # 사용자 관련 컨트롤러
│   │       ├── dto             # 사용자 DTO
│   │       ├── entity          # 사용자 엔티티 클래스
│   │       ├── repository      # 사용자 데이터 저장소
│   │       └── service         # 사용자 서비스 계층
│   ├── resources
│   │   ├── static              # 정적 리소스 (CSS, JS, 이미지)
│   │   └── templates           # HTML 템플릿 파일
│   └── webapp                  # 프론트엔드 소스
│       ├── public              # 공개용 파일
│       └── src
│           ├── api             # API 요청 핸들러
│           │   └── authApi.js  # 인증 관련 API 함수
│           ├── components      # React 컴포넌트
│           │   ├── Header.js   # 헤더 컴포넌트
│           │   ├── Footer.js   # 푸터 컴포넌트
│           │   ├── Popup.js    # 팝업 UI 컴포넌트
│           │   ├── BloodChart.js # 혈당 데이터 시각화 차트
│           │   └── DarkModeBtnCircle.js # 다크모드 전환 버튼
│           └── store           # React 상태 관리
│               ├── useLoginStore.js  # 로그인 상태 관리
│               ├── useEventStore.js  # 이벤트 상태 관리
│               ├── useDarkModeStore.js # 다크 모드 상태 관리
│               ├── useUserInfoStore.js # 사용자 정보 관리
│               └── usePointStore.js  # 포인트 관련 상태 관리
└── test
    ├── java
    │   └── store
    │       └── NonghyuphealthcareApplicationTests.java # 테스트 클래스
    └── resources      # 테스트 리소스
```
