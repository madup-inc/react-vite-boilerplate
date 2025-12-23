## 1. 프로젝트 개요

### 1.1. 목적

* 여러 백오피스(어드민) 프로젝트에서 재사용 가능한 **React 기반 보일러플레이트** 구축
* 공통 요구사항(레이아웃, 인증, 테이블, 필터, 권한, 공통 UI, API 통신)을 선반영하여 **초기 셋업 비용 최소화**
* **shadcn + Radix + Tailwind + TanStack Table** 조합으로 조직 고유의 디자인 시스템 및 테이블 시스템 확보

### 1.2. 주요 특징

* **React + TypeScript + Vite**
* 스타일 및 컴포넌트:

  * **shadcn/ui** (Radix + Tailwind 기반 UI 컴포넌트 세트)
  * **Radix UI** primitives
  * **Tailwind CSS** (디자인 토큰 및 유틸리티)
* 테이블:

  * **TanStack Table** 기반 `DataTable` 공용 컴포넌트
* 상태 관리:

  * **React Query(TanStack Query)** – 서버 상태
  * **Zustand** – 전역 UI/도메인 상태 최소화 관리
* 패턴:

  * feature-based 디렉토리 구조
  * app 레벨에 provider/라우터/스토어 집약

---

## 2. 기술 스택 요약

* **언어/런타임**: React 18+, TypeScript
* **번들러**: Vite
* **스타일**: Tailwind CSS + shadcn/ui 컴포넌트
* **UI 프리미티브**: Radix UI (Dialog, Dropdown, Popover 등)
* **테이블**: TanStack Table v8
* **데이터 페칭**: React Query
* **글로벌 상태**: Zustand
* **품질 도구**: ESLint, Prettier

---

## 3. 환경 구성 (local / dev / prod)

### 3.1. 환경 정의

* **local**: 개발자 로컬 환경
* **dev**: QA/스테이징용 서버
* **prod**: 운영

### 3.2. 환경 변수 구조

* `.env.local` (개인 로컬, gitignore)
* `.env.development`
* `.env.staging` (필요 시)
* `.env.production`

Vite prefix 예:

```bash
VITE_ENV=development
VITE_API_BASE_URL=https://dev-api.example.com
VITE_SENTRY_DSN=...
```

### 3.3. 스크립트 예시

```jsonc
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "build:dev": "cross-env VITE_ENV=development vite build",
    "build:prod": "cross-env VITE_ENV=production vite build",
    "preview": "vite preview"
  }
}
```

---

## 4. 아키텍처 및 개발 방법론

### 4.1. 구조 개념

* **app 레이어**: 라우터, 전역 Provider, 전역 store
* **features 레이어**: 도메인(사용자, 주문 등) 단위로 페이지/컴포넌트/API/hook 응집
* **shared 레이어**: 공통 UI, 테이블, 폼, 레이아웃, 유틸

### 4.2. 패턴

* Feature-Sliced 개념 반영 (`features/<domain>` 단위로 모듈화)
* Smart/Page vs Dumb/Presentational 컴포넌트 분리

  * 페이지 컴포넌트: 데이터 페칭, 상태 조합, 이벤트 처리
  * 프리젠테이셔널: UI 렌더링, props 기반

---

## 5. 디렉토리 구조 설계

```bash
src/
  app/
    main.tsx                # React root
    router/
      index.tsx             # 라우터 생성
      routes.tsx            # route config
    providers/
      AppProvider.tsx       # QueryClient, Theme, Auth 등 통합
      QueryProvider.tsx
      ThemeProvider.tsx
      AuthProvider.tsx
    store/
      useAuthStore.ts
      useUiStore.ts         # 글로벌 UI (사이드바, 테마 등)

  features/
    users/
      api/
        queries.ts          # React Query hooks (useUsersQuery 등)
        mutations.ts
      components/
        UserTable.tsx       # DataTable 래핑
        UserForm.tsx
      pages/
        UserListPage.tsx
        UserDetailPage.tsx
      hooks/
        useUserFilters.ts
      types/
        index.ts
    orders/
      api/
      components/
      pages/
      hooks/
      types/
    # 추가 도메인들...

  shared/
    components/
      ui/                   # shadcn/ui 컴포넌트 복사/커스터마이징
        button.tsx
        input.tsx
        select.tsx
        dialog.tsx
        dropdown-menu.tsx
        checkbox.tsx
        table.tsx?          # 선택: 테이블 셀/헤더 등 기본 스타일
        ...
      layout/
        AppLayout.tsx
        Sidebar.tsx
        Header.tsx
        PageHeader.tsx
        Breadcrumbs.tsx
      table/
        DataTable.tsx
        DataTableToolbar.tsx
        DataTablePagination.tsx
        DataTableColumnVisibility.tsx
      form/
        Form.tsx            # react-hook-form + shadcn Form 래핑
        FormField.tsx
      feedback/
        Toast.tsx
        ConfirmDialog.tsx
    hooks/
      useDebounce.ts
      usePagination.ts
      useSorting.ts
      useDialog.ts
    libs/
      axiosClient.ts
      auth.ts
      date.ts
      queryClient.ts
    types/
      common.ts

  styles/
    globals.css             # Tailwind base + 프로젝트 전역 스타일
    tailwind.css            # 필요 시 분리

  pages/                    # 라우터 엔트리(또는 Vite-React-Router 설정에 맞게)
    DashboardPage.tsx
    LoginPage.tsx

tailwind.config.ts
tsconfig.json
vite.config.ts
```

---

## 6. 공통 컴포넌트 목록 (핵심)

### 6.1. shadcn 기반 UI 컴포넌트 (`shared/components/ui`)

* Typography: `Heading`, `Text` (필요 시)
* Layout 기타: `Card`, `ScrollArea` 등
* Form 관련: `Input`, `Textarea`, `Select`, `Checkbox`, `Switch`, `RadioGroup`
* Feedback: `Button`, `Badge`, `Alert`, `Toast`
* Overlay: `Dialog`, `AlertDialog`, `Drawer`, `Popover`, `Tooltip`
* Navigation: `Tabs`, `DropdownMenu`, `Breadcrumb`, `Pagination`

→ 전부 shadcn CLI로 가져와 Tailwind 토큰에 맞게 커스터마이즈.

### 6.2. 레이아웃 (`shared/components/layout`)

* `AppLayout`

  * Header, Sidebar, Content 영역 구성
  * 로그인 후 모든 페이지의 공통 프레임
* `Sidebar`

  * 메뉴/권한 기반 네비게이션
* `Header`

  * 사용자 정보, 로그아웃, 글로벌 액션
* `PageHeader`

  * 페이지 타이틀 + 우측 액션 버튼
* `Breadcrumbs`

  * 라우트 기반 브레드크럼

### 6.3. 테이블 (`shared/components/table`)

* `DataTable`

  * TanStack Table 기반 공용 테이블
  * 컬럼 정의, 정렬, 필터, 페이징, row selection 지원
* `DataTableToolbar`

  * 검색 인풋, 필터 Select, Bulk Action 버튼 영역
* `DataTablePagination`

  * 페이지 번호, pageSize 변경, total count 표시
* `DataTableColumnVisibility`

  * 컬럼 ON/OFF 토글 (Radix DropdownMenu 활용)

### 6.4. 폼 (`shared/components/form`)

* `Form`

  * `react-hook-form` + shadcn `Form` 컴포넌트 래핑
* `FormField`

  * label + description + error + 실제 컨트롤을 통합
* 각 UI 컨트롤과의 통합 컴포넌트 (예: `FormInput`, `FormSelect` 등은 필요 시)

### 6.5. 피드백/상태 (`shared/components/feedback`)

* `Toast`

  * 성공/에러/정보 알림
* `ConfirmDialog`

  * 삭제/위험 액션 확인 모달
* `EmptyState`

  * 테이블/페이지 데이터 없을 때 공통 UI

---

## 7. 테이블 시스템 설계 (TanStack Table)

### 7.1. 기본 개념

* **TanStack Table**을 기반으로, 백오피스 전용 `DataTable` 컴포넌트를 설계

### 7.2. 타입 및 Props 예시

```ts
// shared/components/table/types.ts
import { ColumnDef } from "@tanstack/react-table";

export type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  totalCount?: number; // server-side paging
  page: number;
  pageSize: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  isLoading?: boolean;
  isError?: boolean;
  toolbar?: React.ReactNode;
  enableRowSelection?: boolean;
  onRowSelectionChange?: (selectedIds: string[]) => void;
  getRowId?: (row: TData) => string;
};
```

### 7.3. 사용 패턴

* `features/users/components/UserTable.tsx`에서:

```tsx
export function UserTable() {
  const { data, isLoading } = useUsersQuery(filters);
  const columns = useUserColumns(); // 컬럼 정의 커스텀 hook

  return (
    <DataTable
      columns={columns}
      data={data?.items ?? []}
      totalCount={data?.total ?? 0}
      page={filters.page}
      pageSize={filters.pageSize}
      onPageChange={...}
      onPageSizeChange={...}
      toolbar={<UserTableToolbar />}
      isLoading={isLoading}
      enableRowSelection
      onRowSelectionChange={...}
    />
  );
}
```

---

## 8. 상태 관리 및 데이터 페칭 패턴

### 8.1. React Query 사용 규칙

* `shared/libs/queryClient.ts`에서 `QueryClient` 생성 및 공통 옵션 정의
* 각 feature는 `features/<domain>/api/queries.ts`에서 Query hook 구현:

  * 예: `useUsersQuery`, `useUserDetailQuery`, `useUpdateUserMutation`

규칙:

* 쿼리 키를 `[도메인, 서브키, 파라미터]` 형태로 일관되게 정의
* 에러/로딩 상태는 공통 레이아웃 또는 페이지 단위에서 처리

### 8.2. Zustand 사용 규칙

* `app/store`에서 글로벌 store 정의:

  * 인증 상태: `useAuthStore`
  * UI 상태: `useUiStore` (사이드바 오픈, 테마 등)
* 도메인 상태(필터, 정렬 등)는 가능하면 `URLSearchParams` + 페이지 내부 상태로 처리하고,
  정말 필요할 때만 feature 내부에 Zustand store를 추가.

---

## 9. AI 사용 규칙 (중요)

AI(예: ChatGPT, 사내 AI 도구)를 활용해 화면/기능을 개발할 때의 **가이드라인**입니다.

### 9.1. 공통 규칙

1. **항상 스택을 명시해서 요청**

   * 예:
     “React + TypeScript + Vite 환경이고,
     shadcn/ui + Radix + Tailwind + TanStack Table + React Query + Zustand를 사용합니다.”
     를 프롬프트에 포함.

2. **공통 컴포넌트 사용 강제**

   * 버튼, 인풋, 모달, 드롭다운, 테이블 등은 **반드시**
     `@/shared/components/ui/*` 또는 `@/shared/components/table/DataTable`을 사용하도록 명시.
   * 예:
     “버튼은 `@/shared/components/ui/button`의 `<Button />`를 사용해 주세요.”

3. **디렉토리/파일 위치 명시**

   * “`features/users/pages/UserListPage.tsx` 파일에서 사용할 코드 작성해줘”
     처럼 파일 위치를 정확히 알려주면, AI가 import 경로를 일관되게 잡기 쉬움.

4. **테이블 규칙 명시**

   * “리스트 화면은 반드시 `DataTable`을 사용하고, 컬럼 정의는 `useUserColumns` 같은 hook으로 분리해 줘.”
   * 필터/정렬/페이지네이션 처리 방식을 프롬프트에 구체적으로 적기.

### 9.2. 프롬프트 템플릿 예시

1. **리스트 페이지 생성 요청 예시**

> React + TypeScript + Vite 환경입니다.
> shadcn/ui + Radix + Tailwind + TanStack Table + React Query + Zustand를 사용합니다.
>
> `features/users/pages/UserListPage.tsx` 파일에 들어갈 사용자 목록 페이지 코드를 작성해 주세요.
>
> 요구사항:
>
> * 레이아웃은 `AppLayout`을 사용합니다.
> * 테이블은 `@/shared/components/table/DataTable`을 사용합니다.
> * 컬럼 정의는 `useUserColumns`라는 hook으로 분리해 주세요.
> * 데이터는 `useUsersQuery`(이미 구현되어 있다고 가정)를 사용해 가져옵니다.
> * 검색 인풋, 상태 필터(활성/비활성)를 `DataTableToolbar` 내에서 구현해 주세요.
> * 버튼, 인풋, 셀렉트는 모두 shadcn/ui 컴포넌트(`@/shared/components/ui`)를 사용해 주세요.

2. **공통 컴포넌트 수정 요청 예시**

> `@/shared/components/ui/button.tsx` 파일의 `<Button />` 컴포넌트에 `variant="danger"` 옵션을 추가해 주세요.
> shadcn/ui 스타일을 유지하면서, Tailwind 클래스로 붉은 색 계열 스타일을 적용해 주세요.
> 기존 variant(`default`, `outline`, ...)와 동일한 패턴을 그대로 따라 구현해 주세요.

3. **테이블 확장 요청 예시**

> `@/shared/components/table/DataTable.tsx`를 개선하고 싶습니다.
>
> * TanStack Table v8을 사용합니다.
> * 현재 정렬/페이징만 지원하는데,
>   컬럼별 필터(텍스트/셀렉트)를 지원하는 기능을 추가해 주세요.
> * 필터 UI는 Radix Dropdown + shadcn Input/Select를 조합해 주세요.
> * 필터 상태는 부모에서 받아서 제어하는 controlled 방식으로 구현하고,
>   props로 `filters`와 `onFiltersChange`를 받도록 변경해 주세요.

이 정도 규칙 + 템플릿을 문서에 포함해두면,
누구든지 AI에게 요청할 때 **같은 패턴**으로 코드를 생성하게 강제할 수 있습니다.

---

## 10. 초기 스코프 제안 (보일러플레이트 v1)

1. **환경 셋업**

   * Vite + React + TS
   * Tailwind 설정
   * shadcn/ui 초기 설치 및 핵심 컴포넌트(Button, Input, Select, Dialog, Dropdown 등) 도입
   * Radix는 shadcn 내부에서 사용, 필요 시 직접 import

2. **전역 Provider 구성**

   * React Query QueryClient
   * Zustand store 초기 셋업
   * ThemeProvider (다크/라이트 모드 포함 가능)
   * AuthProvider(토큰/유저 정보 관리 스켈레톤)

3. **레이아웃 구현**

   * AppLayout + Sidebar + Header + PageHeader + Breadcrumbs

4. **테이블 시스템 v1**

   * TanStack Table 기반 `DataTable` + `DataTableToolbar` + `DataTablePagination`
   * 단일 필터/정렬/페이징 기능 우선 구현

5. **예제 도메인: Users**

   * `UserListPage` (DataTable 사용)
   * `UserDetailPage`
   * `UserForm` (react-hook-form + shadcn Form 래핑)

6. **AI 사용 가이드 문서**

   * 위 9번 섹션 내용을 README 또는 별도 `AI_GUIDE.md`로 정리

