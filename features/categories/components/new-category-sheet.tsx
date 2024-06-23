import {Sheet,SheetContent,SheetDescription,SheetHeader,SheetTitle} from '@/components/ui/sheet' 
import React from 'react'
import { insertCategoriesSchema } from '@/db/schema';
import { z } from 'zod';
import { useCreateCategory } from '@/features/categories/api/use-create-category';
import { CategoryForm } from '@/features/categories/components/category-form';
import { useNewCategory } from '@/features/categories/hooks/use-new-category';

const formSchema = insertCategoriesSchema.pick({
    name:true,
})
type FormValues = z.input<typeof formSchema>;

export const NewCategorySheet = () => {
    const {isOpen, onClose} = useNewCategory();
    const onSubmit = (values:FormValues) => {
        mutation.mutate(values,{
            onSuccess:() => {
                onClose()
            }
        })
    }
    const mutation = useCreateCategory()
  return (
    <Sheet open = {isOpen} onOpenChange={onClose}>
        <SheetContent className=' space-y-4 '>
            <SheetHeader>
                <SheetTitle>
                    New Category
                </SheetTitle>
                <SheetDescription>
                    Create a new category to organize your transactions.
                </SheetDescription>
            </SheetHeader>
            <CategoryForm onSubmit={onSubmit} disabled = {mutation.isPending}  defaultValues={{
                name:''
            }}/>
        </SheetContent>
    </Sheet>
  )
}
