import { NPButton } from '@/app/components/Elements/Button';
import { useTheme } from 'next-themes';
import { type Dispatch, type SetStateAction } from 'react';

type HeaderButtonProps = {
  openConfig: boolean;
  setOpenConfig: Dispatch<SetStateAction<boolean>>;
};

export const HeaderButton = ({ openConfig, setOpenConfig }: HeaderButtonProps) => {
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex gap-6">
      <NPButton
        npType={openConfig ? 'press' : 'flat'}
        npColor={openConfig ? 'blue' : undefined}
        className="size-8"
        onClick={() => setOpenConfig(prev => !prev)}
      >
        <span className="i-material-symbols-settings-outline-rounded size-6"></span>
      </NPButton>
      {theme === 'light' ? (
        <NPButton npType="flat" className="size-8" type="button" onClick={() => setTheme('dark')}>
          <div className="flex items-center justify-center gap-1">
            <span className="i-material-symbols-dark-mode-rounded"></span>
          </div>
        </NPButton>
      ) : (
        <NPButton npType="flat" className="size-8" type="button" onClick={() => setTheme('light')}>
          <div className="flex items-center justify-center gap-1">
            <span className="i-material-symbols-light-mode-rounded"></span>
          </div>
        </NPButton>
      )}
    </div>
  );
};
