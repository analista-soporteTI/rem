export type SuggestionItemProps = {
  hit: { Product: string }
  onClick: (product: string) => void
  setShowSuggestions: (value: boolean) => void
}