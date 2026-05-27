import { create } from 'zustand';
import { MatConfig } from '@/types';

interface ConfiguratorStore {
  config: MatConfig;
  setConfig: (config: Partial<MatConfig>) => void;
  resetConfig: () => void;
}

const defaultConfig: MatConfig = {
  type: 'comfort',
  placement: 'ingang',
  orientation: 'landscape',
  border: 'standaard',
  width: 60,
  height: 90,
  color: '#1B5E9E',
  logoColor: '#FFFFFF',
  logoUrl: undefined,
  quantity: 1,
};

export const useConfiguratorStore = create<ConfiguratorStore>((set) => ({
  config: defaultConfig,
  setConfig: (partial) =>
    set((state) => ({ config: { ...state.config, ...partial } })),
  resetConfig: () => set({ config: defaultConfig }),
}));
