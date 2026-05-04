import type { Meta, StoryObj } from "@storybook/nextjs";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";

const meta: Meta = {
  title: "Dialog",
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger className="body2 text-gray-400">다이얼로그 열기</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>제목</DialogTitle>
          <DialogDescription>다이얼로그 설명 텍스트입니다.</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  ),
};

// export const WithFooter: Story = {
//   render: () => (
//     <Dialog>
//       <DialogTrigger className="body2 text-gray-400">다이얼로그 열기</DialogTrigger>
//       <DialogContent showCloseButton={false}>
//         <DialogHeader>
//           <DialogTitle>제목</DialogTitle>
//           <DialogDescription>다이얼로그 설명 텍스트입니다.</DialogDescription>
//         </DialogHeader>
//         <DialogFooter showCloseButton>
//           <DialogClose className="body2 text-gray-400">취소</DialogClose>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   ),
// };

// export const Confirmation: Story = {
//   render: () => (
//     <Dialog>
//       <DialogTrigger className="body2 text-gray-400">삭제</DialogTrigger>
//       <DialogContent showCloseButton={false}>
//         <DialogHeader>
//           <DialogTitle>정말 삭제하시겠어요?</DialogTitle>
//           <DialogDescription>삭제된 일기는 복구할 수 없습니다.</DialogDescription>
//         </DialogHeader>
//         <DialogFooter>
//           <DialogClose className="body2 text-destructive">삭제</DialogClose>
//           <DialogClose className="body2 text-gray-400">취소</DialogClose>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   ),
// };

// export const DefaultOpen: Story = {
//   render: () => (
//     <Dialog defaultOpen>
//       <DialogTrigger className="body2 text-gray-400">다이얼로그 열기</DialogTrigger>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>제목</DialogTitle>
//           <DialogDescription>기본으로 열린 상태의 다이얼로그입니다.</DialogDescription>
//         </DialogHeader>
//       </DialogContent>
//     </Dialog>
//   ),
// };
