/** Shared property photos for mock data (Unsplash — works with next/image). */
export const mockPropertyImages = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=1200&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1200&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=1200&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=1200&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=1200&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=1200&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1600585152915-d208bec867a1?w=1200&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1600047509782-20d39509f26d?w=1200&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1600563438938-a9a27216b8a1?w=1200&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=1200&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=1200&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1600607687641-2c4c3b8f90d4?w=1200&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1600607688960-e095ff83135f?w=1200&auto=format&fit=crop&q=80",
];

export function getMockPropertyImage(index: number): string {
  return mockPropertyImages[index % mockPropertyImages.length];
}
