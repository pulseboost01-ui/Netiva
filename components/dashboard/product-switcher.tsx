'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { GraduationCap, FileText, MessageSquare, Users, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const products = [
  { id: 'edtech', name: 'EdTech SMS', icon: GraduationCap, href: '/dashboard/edtech' },
  { id: 'resume', name: 'ResumeRocket AI', icon: FileText, href: '/dashboard/resume' },
  { id: 'bidai', name: 'BidAI Pro', icon: MessageSquare, href: '/dashboard/bidai' },
  { id: 'affiliates', name: 'Affiliates Omega', icon: Users, href: '/dashboard/affiliates' },
];

export function ProductSwitcher({ currentProduct }: { currentProduct: string | null }) {
  const router = useRouter();
  const { update } = useSession();
  const current = products.find((p) => p.id === currentProduct) || products[0];

  const handleSwitch = async (productId: string) => {
    try {
      // Persist selection into session first (so switching works without MongoDB)
      await update?.({ primaryProduct: productId } as any);

      const res = await fetch('/api/user/update-product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ primaryProduct: productId }),
      });
      // Even if MongoDB write fails, navigate using session selection.
      const product = products.find((p) => p.id === productId);
      if (product) {
        router.push(product.href);
        router.refresh();
      }
    } catch (error) {
      console.error('Failed to switch product:', error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full justify-between gap-2">
          <div className="flex items-center gap-2">
            <current.icon className="h-4 w-4" />
            <span className="font-medium">{current.name}</span>
          </div>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        {products.map((product) => (
          <DropdownMenuItem
            key={product.id}
            onClick={() => handleSwitch(product.id)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <product.icon className="h-4 w-4" />
            <span>{product.name}</span>
            {product.id === currentProduct && (
              <Badge variant="secondary" className="ml-auto text-xs">Active</Badge>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
