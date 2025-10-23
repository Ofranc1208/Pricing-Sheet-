// ========================================
// 🛠️ CSV Parser Utilities
// ========================================
// Shared utility functions

// Normalize text for comparison
export function normalizeText(text: string): string {
  return text.toLowerCase().trim().replace(/[^a-z0-9]/g, '')
}

// Find matching field key for a header
export function findFieldKey(header: string, mappings: Record<string, string[]>): keyof any | null {
  const normalizedHeader = normalizeText(header)

  for (const [fieldKey, variations] of Object.entries(mappings)) {
    for (const variation of variations) {
      if (normalizeText(variation) === normalizedHeader) {
        return fieldKey as keyof any
      }
    }
  }

  return null
}
