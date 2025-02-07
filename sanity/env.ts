export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-02-04'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)
export const token = assertValue(
  "sk4oYWMr7rTlY8s74H6OV7hCOFB9xYVgpPVJDKXJM2ZkrfxEFATy3qcmV8sYIz6oX7hJxZOCvitpXoyaGZfflhBwK37a6Mc2pdqJhOM50GLKHsQPg1cuvsUiCJj22oSvmAIO7zTMKlDNhYxk5RhCvSLa9pqMJued90Gd4H6fIZBaY05WpmMF",
  'Missing environment variable: SANITY_API_TOKEN'
)


function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
