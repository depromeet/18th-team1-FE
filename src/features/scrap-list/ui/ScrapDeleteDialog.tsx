import { Button } from "@/shared/ui/button";
import { Dialog, DialogContent } from "@/shared/ui/dialog";

interface ScrapDeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCount: number;
  onConfirm: () => void;
}

export const ScrapDeleteDialog = ({
  open,
  onOpenChange,
  selectedCount,
  onConfirm,
}: ScrapDeleteDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className="w-71 gap-7.25 pt-6.75">
        <div className="flex flex-col items-center text-center">
          <p className="body1 text-gray-600">
            <span className="subhead3 text-gray-700">{selectedCount}개의 문장</span>을
          </p>
          <p className="body1 text-gray-600">스크랩 삭제할까요?</p>
        </div>

        <div className="flex gap-2.5">
          <Button
            label="취소"
            onClick={() => onOpenChange(false)}
            className="subhead4 h-11.5 rounded-lg bg-gray-100 text-gray-300"
          />
          <Button label="삭제" onClick={onConfirm} className="subhead4 h-11.5 rounded-lg" />
        </div>
      </DialogContent>
    </Dialog>
  );
};
