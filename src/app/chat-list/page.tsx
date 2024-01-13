'use client';
import { getChatList } from '@/lib/api/SupabaseApi';
import React, { useEffect } from 'react';

export default function chatListPage() {
  async function data() {
    try {
      await getChatList();
    } catch (error) {
      alert('서버와의 통신을 실패했습니다.');
    }
  }
  useEffect(() => {
    data();
  }, []);

  return <div>chatListpage</div>;
}
