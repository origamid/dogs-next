'use server';

import { PHOTOS_GET } from '@/functions/api';
import apiError from '@/functions/api-error';

export type Photo = {
  id: number;
  author: string;
  title: string;
  date: string;
  src: string;
  peso: string;
  idade: string;
  acessos: string;
  total_comments: string;
};

type PhotosGetParams = {
  page?: number;
  total?: number;
  user?: 0 | string;
};

export default async function photosGet(
  { page = 1, total = 6, user = 0 }: PhotosGetParams = {},
  optionsFront?: RequestInit,
) {
  try {
    const options = optionsFront || {
      next: { revalidate: 10, tags: ['photos'] },
    };
    const { url } = PHOTOS_GET({ page, total, user });
    const response = await fetch(url, options);
    if (!response.ok) throw new Error('Erro ao pegar as fotos.');
    const data = (await response.json()) as Photo[];
    return { data, ok: true, error: '' };
  } catch (error) {
    return apiError(error);
  }
}
