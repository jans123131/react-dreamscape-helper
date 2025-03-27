
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { UserForm } from '@/components/UserForm';
import { UserData } from '@/components/UserItem';

interface UserModifyModalProps {
  user: UserData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: Partial<UserData> & { password?: string }) => void;
}

export const UserModifyModal: React.FC<UserModifyModalProps> = ({
  user,
  open,
  onOpenChange,
  onSubmit,
}) => {
  if (!user) return null;

  const handleSubmit = (data: Partial<UserData> & { password?: string }) => {
    onSubmit(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Modifier l'utilisateur</DialogTitle>
          <DialogDescription>
            Modifiez les informations de l'utilisateur ci-dessous
          </DialogDescription>
        </DialogHeader>
        <UserForm 
          initialData={user} 
          onSubmit={handleSubmit} 
          onCancel={() => onOpenChange(false)}
          isEditMode={true}
        />
      </DialogContent>
    </Dialog>
  );
};
