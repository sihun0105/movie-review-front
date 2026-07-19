type RefreshScore = () => unknown | Promise<unknown>

export async function refreshScoreViews(
  refreshMyScore: RefreshScore,
  refreshMovie?: RefreshScore,
) {
  await Promise.all([refreshMyScore(), refreshMovie?.()])
}
