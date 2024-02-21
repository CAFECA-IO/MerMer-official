let timerId: ReturnType<typeof setTimeout> | null = null; // 保存計時器ID的變量, 因為nextjs useEffect會被call兩次，如果IncreaseViewAfterDelay被call兩次，要取消第一次

export async function increaseView(kmId: string) {
  await fetch(`/api/kms/${kmId}/increaseViewCount`);
}

export function increaseViewAfterDelay(kmId: string, delay: number) {

  if (timerId) {
    clearTimeout(timerId);
  }

  timerId = setTimeout(() => {
    increaseView(kmId)
    timerId = null;
  }, delay);

  // Info (20240220 - Murky) 如果太早離開頁面，就不要view + 1
  if (typeof window !== 'undefined') {


    window.addEventListener('beforeunload', () => {
      if (timerId){
        clearTimeout(timerId);
        timerId = null;
      }
    })
  }
}