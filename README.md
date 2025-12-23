# React Vite Boilerplate

React + TypeScript 기반의 백오피스 프로젝트들을 빠르게 시작할 수 있도록 설계한 보일러플레이트입니다.

## 주요 기술 스택

| 카테고리 | 기술 |
|---------|------|
| **Core** | React 18+, TypeScript, Vite |
| **UI** | shadcn/ui, Radix UI, Tailwind CSS |
| **테이블** | TanStack Table v8 |
| **상태 관리** | React Query (서버 상태), Zustand (클라이언트 상태) |
| **폼** | react-hook-form, zod |
| **라우팅** | react-router-dom |
| **HTTP** | axios |
| **품질 도구** | ESLint, Prettier |

---

## 빠른 시작

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview
```

---

## 디렉토리 구조

```
src/
├── app/                    # 앱 레이어
│   ├── main.tsx           # React 진입점
│   ├── router/            # 라우터 설정
│   ├── providers/         # 전역 Provider
│   └── store/             # Zustand 스토어
│
├── features/              # 도메인별 기능
│   └── users/             # 사용자 도메인 (예제)
│       ├── api/           # React Query hooks
│       ├── components/    # 도메인 컴포넌트
│       ├── hooks/         # 커스텀 hooks
│       ├── pages/         # 페이지 컴포넌트
│       └── types/         # 타입 정의
│
├── shared/                # 공유 레이어
│   ├── components/
│   │   ├── ui/           # shadcn/ui 컴포넌트
│   │   ├── layout/       # 레이아웃 컴포넌트
│   │   ├── table/        # 테이블 시스템
│   │   ├── form/         # 폼 컴포넌트
│   │   └── feedback/     # 피드백 컴포넌트
│   ├── hooks/            # 공통 hooks
│   ├── libs/             # 유틸리티, API 클라이언트
│   └── types/            # 공통 타입
│
├── pages/                 # 라우터 엔트리 페이지
└── styles/               # 전역 스타일
```

---

## 주요 기능

### 1. 레이아웃 시스템

- **AppLayout**: Header + Sidebar + Content 영역 구성
- **Sidebar**: 접기/펴기 지원, 메뉴 네비게이션
- **Header**: 사용자 메뉴, 테마 토글, 알림
- **PageHeader**: 페이지 타이틀 + 액션 버튼
- **Breadcrumbs**: 라우트 기반 브레드크럼

### 2. 테이블 시스템 (TanStack Table)

```tsx
import { DataTable } from "@/shared/components/table/DataTable";

<DataTable
  columns={columns}
  data={data?.items ?? []}
  totalCount={data?.total}
  page={page}
  pageSize={pageSize}
  onPageChange={setPage}
  onPageSizeChange={setPageSize}
  isLoading={isLoading}
  enableRowSelection
  toolbar={<CustomToolbar />}
/>
```

**주요 기능:**
- 정렬, 페이지네이션
- Row Selection
- 커스텀 툴바
- 로딩/에러 상태
- 컬럼 가시성 설정

### 3. 폼 시스템 (react-hook-form + zod)

```tsx
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/shared/components/form";

const schema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
});

<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)}>
    <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel>이메일</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </form>
</Form>
```

### 4. 상태 관리

**서버 상태 (React Query)**
```tsx
// 쿼리
const { data, isLoading } = useUsersQuery(filters);

// 뮤테이션
const mutation = useCreateUserMutation();
await mutation.mutateAsync(userData);
```

**클라이언트 상태 (Zustand)**
```tsx
const { isSidebarCollapsed, toggleSidebarCollapse } = useUiStore();
const { user, isAuthenticated } = useAuthStore();
```

### 5. API 통신

```tsx
import { api } from "@/shared/libs/axiosClient";

// 기본 사용
const users = await api.get<User[]>("/users");
const user = await api.post<User>("/users", userData);
```

---

## 환경 설정

### 환경 변수

```bash
# .env.local (개인 로컬, gitignore)
VITE_ENV=local
VITE_API_BASE_URL=http://localhost:3001

# .env.development
VITE_ENV=development
VITE_API_BASE_URL=https://dev-api.example.com

# .env.production
VITE_ENV=production
VITE_API_BASE_URL=https://api.example.com
```

### 빌드 스크립트

```bash
npm run dev          # 개발 서버
npm run build        # 프로덕션 빌드
npm run build:dev    # 개발 환경 빌드
npm run build:prod   # 프로덕션 환경 빌드
```

---

## 새 도메인(Feature) 추가하기

1. **디렉토리 구조 생성**
```
features/
  orders/
    api/
      queries.ts
      mutations.ts
      index.ts
    components/
      OrderTable.tsx
      OrderForm.tsx
      index.ts
    hooks/
      useOrderFilters.ts
      useOrderColumns.tsx
      index.ts
    pages/
      OrderListPage.tsx
      OrderDetailPage.tsx
      index.ts
    types/
      index.ts
    index.ts
```

2. **타입 정의** (`types/index.ts`)
3. **API 훅 구현** (`api/queries.ts`, `api/mutations.ts`)
4. **컴포넌트 구현** (`components/`)
5. **페이지 구현** (`pages/`)
6. **라우터에 추가** (`app/router/index.tsx`)

---

## 공통 컴포넌트

### UI 컴포넌트 (`@/shared/components/ui`)

| 컴포넌트 | 설명 |
|---------|------|
| Button | 버튼 (variant: default, destructive, outline, secondary, ghost, link) |
| Input | 텍스트 입력 |
| Textarea | 텍스트 영역 |
| Select | 셀렉트 박스 |
| Checkbox | 체크박스 |
| Switch | 토글 스위치 |
| Dialog | 모달 다이얼로그 |
| AlertDialog | 확인 다이얼로그 |
| DropdownMenu | 드롭다운 메뉴 |
| Popover | 팝오버 |
| Tooltip | 툴팁 |
| Tabs | 탭 |
| Card | 카드 |
| Badge | 뱃지 |
| Separator | 구분선 |
| ScrollArea | 스크롤 영역 |
| Skeleton | 로딩 스켈레톤 |
| Toast | 토스트 알림 |

### 테이블 컴포넌트 (`@/shared/components/table`)

| 컴포넌트 | 설명 |
|---------|------|
| DataTable | TanStack Table 기반 테이블 |
| DataTableToolbar | 검색/필터/액션 툴바 |
| DataTablePagination | 페이지네이션 |
| DataTableColumnHeader | 정렬 가능한 컬럼 헤더 |
| DataTableColumnVisibility | 컬럼 표시/숨김 설정 |

### 폼 컴포넌트 (`@/shared/components/form`)

| 컴포넌트 | 설명 |
|---------|------|
| Form | react-hook-form FormProvider 래퍼 |
| FormField | 폼 필드 컨트롤러 |
| FormItem | 폼 아이템 컨테이너 |
| FormLabel | 폼 레이블 |
| FormControl | 폼 컨트롤 래퍼 |
| FormMessage | 에러 메시지 |
| FormDescription | 필드 설명 |

### 피드백 컴포넌트 (`@/shared/components/feedback`)

| 컴포넌트 | 설명 |
|---------|------|
| ConfirmDialog | 확인/취소 다이얼로그 |
| EmptyState | 데이터 없음 상태 |
| LoadingSpinner | 로딩 스피너 |
| LoadingOverlay | 로딩 오버레이 |

---

## 공통 Hooks

| Hook | 설명 |
|------|------|
| `useDebounce` | 값 디바운싱 |
| `usePagination` | 페이지네이션 상태 (URL 연동) |
| `useSorting` | 정렬 상태 (URL 연동) |
| `useDialog` | 다이얼로그 열기/닫기 상태 |
| `useToast` | 토스트 알림 |

---

## AI 사용 Rule

AI를 활용한 개발 가이드를 위한 cursor/rules 설정

---

## 다른 팁

project-create-prompt.md 파일을 수정해서 새로운 프로젝트 생성하면 다른 보일러 플레이트를 생성할 수 있습니다.