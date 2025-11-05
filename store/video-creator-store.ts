import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Scene, VideoTemplate } from '@/lib/types/video';

interface VideoCreatorState {
  // プロジェクト情報
  projectName: string;
  template: VideoTemplate;

  // シーンデータ
  scenes: Scene[];

  // UI状態
  currentStep: 'template' | 'script' | 'scenes' | 'preview';
  isGenerating: boolean;

  // アクション
  setProjectName: (name: string) => void;
  setTemplate: (template: VideoTemplate) => void;
  setScenes: (scenes: Scene[]) => void;
  updateScene: (id: number, updates: Partial<Scene>) => void;
  addScene: (scene: Scene) => void;
  removeScene: (id: number) => void;
  setCurrentStep: (step: VideoCreatorState['currentStep']) => void;
  setIsGenerating: (isGenerating: boolean) => void;
  resetProject: () => void;
}

const initialState = {
  projectName: 'Untitled Project',
  template: 'youtube-shorts' as VideoTemplate,
  scenes: [],
  currentStep: 'template' as const,
  isGenerating: false,
};

export const useVideoCreatorStore = create<VideoCreatorState>()(
  persist(
    (set) => ({
      ...initialState,

      setProjectName: (name) => set({ projectName: name }),

      setTemplate: (template) => set({ template }),

      setScenes: (scenes) => set({ scenes }),

      updateScene: (id, updates) =>
        set((state) => ({
          scenes: state.scenes.map((scene) =>
            scene.id === id ? { ...scene, ...updates } : scene
          ),
        })),

      addScene: (scene) =>
        set((state) => ({
          scenes: [...state.scenes, scene],
        })),

      removeScene: (id) =>
        set((state) => ({
          scenes: state.scenes.filter((scene) => scene.id !== id),
        })),

      setCurrentStep: (currentStep) => set({ currentStep }),

      setIsGenerating: (isGenerating) => set({ isGenerating }),

      resetProject: () => set(initialState),
    }),
    {
      name: 'video-creator-storage',
      partialize: (state) => ({
        projectName: state.projectName,
        template: state.template,
        scenes: state.scenes,
      }),
    }
  )
);
