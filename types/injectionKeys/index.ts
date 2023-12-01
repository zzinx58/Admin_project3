import type { useMessage } from "naive-ui";
import type { InjectionKey } from "vue";
export const naiveMessageKey = Symbol() as InjectionKey<typeof useMessage>;
