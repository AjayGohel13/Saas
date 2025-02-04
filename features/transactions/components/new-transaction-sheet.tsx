import {Sheet,SheetContent,SheetDescription,SheetHeader,SheetTitle} from '@/components/ui/sheet' 
import React from 'react'
import { insertTransactionSchema } from '@/db/schema';
import { z } from 'zod';
import { useNewTransaction } from '@/features/transactions/hooks/use-new-transaction';
import { useCreatTransaction } from '@/features/transactions/api/use-create-transaction';
import { useCreateCategory } from '@/features/categories/api/use-create-category';
import { useGetCategories } from '@/features/categories/api/use-get-categories';
import { useGetAccounts } from '@/features/accounts/api/use-get-accounts';
import { useCreateAccount } from '@/features/accounts/api/use-create-account';
import { TransactionsForm } from '@/features/transactions/components/transactions-form';
import { Loader2 } from 'lucide-react';

const formSchema = insertTransactionSchema.omit({
    id:true,
})
type FormValues = z.input<typeof formSchema>;

export const NewTransactionSheet = () => { 
    const {isOpen, onClose} = useNewTransaction();
    const CreateMutation = useCreatTransaction()
        
    const categoryQuery = useGetCategories();
    const categoryMutation = useCreateCategory()
    const onCreateCategory = (name:string) => categoryMutation.mutate({
        name
    })
    const categoryOptions = (categoryQuery.data ?? []).map((category) => ({
        label: category.name,
        value:category.id
    }))

    // account
    const accountQuery = useGetAccounts();
    const accountMutation = useCreateAccount()
    const onCreateAccount = (name:string) => accountMutation.mutate({
        name
    })
    const accountOptions = (accountQuery.data ?? []).map((account) => ({
        label: account.name,
        value:account.id
    }))

    const isPending = CreateMutation.isPending || 
    categoryMutation.isPending ||
    accountMutation.isPending

    const isLoading = categoryQuery.isLoading ||
    accountQuery.isLoading
    
    const onSubmit = (values:FormValues) => {
        CreateMutation.mutate(values,{
            onSuccess:() => {
                onClose()
            }
        })
    }
  return (
    <Sheet open = {isOpen} onOpenChange={onClose}>
        <SheetContent className=' space-y-4 '>
            <SheetHeader>
                <SheetTitle>
                    New Transaction
                </SheetTitle>
                <SheetDescription>
                    Create a new Transaction to track your transactions.
                </SheetDescription>
            </SheetHeader>
            {isLoading ?(
                <div className=' absolute inset-0 flex items-center justify-center ' >
                    <Loader2 className=' size-4 text-muted-foreground animate-spin  ' />
                </div>
            )
            :(

                <TransactionsForm
                    onSubmit={onSubmit}
                    disabled= {isPending}
                    categoryOptions={categoryOptions}
                    onCreateCategory ={onCreateCategory}
                    accountOptions={accountOptions}
                    onCreateAccount={onCreateAccount}
                  />
            )
                
            }
        </SheetContent>
    </Sheet>
  )
}
