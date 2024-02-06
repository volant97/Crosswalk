'use client';
import { useRouter } from 'next/navigation';

function CustomerService() {
  // 고객센터 제작중
  const router = useRouter();

  router.push('/customer-service/contact');

  return null;
}

export default CustomerService;
