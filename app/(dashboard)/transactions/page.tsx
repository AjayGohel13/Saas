'use client'
import { useNewTransaction } from '@/features/transactions/hooks/use-new-transaction'
import { useGetTransactions } from '@/features/transactions/api/use-get-transactions'
import React, { use, useState } from 'react'
import { transactions as transactionSchema } from '@/db/schema'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { Loader2, Plus } from 'lucide-react'
import { columns } from './column'
import { DataTable } from '@/components/data-table'
import { useBulkDeleteteTransactions } from '@/features/transactions/api/use-bulk-delete-transactions'
import UploadButton from './UploadButton'
import ImportCard from './Import-card'
import { useSelectAccount } from '@/features/accounts/hooks/use-select-account'
import { toast } from 'sonner'
import { useBulkCreateTransactions } from '@/features/transactions/api/use-bulk-create-transactions'
enum VARIANTS {
    LIST = "LIST",
    IMPORT = "IMPORT"
}

const INITIAL_IMPORT_RESULT = {
    data: [],
    errors: [],
    meta: {},
}
const TransactionsPage = () => {
    const [AccountDialog,confirm] = useSelectAccount()
    const [variant, setVariant] = useState<VARIANTS>(VARIANTS.LIST)
    const [importResults, setImportResults] = useState(INITIAL_IMPORT_RESULT);
    const newTransaction = useNewTransaction()
    const CreateTransactions = useBulkCreateTransactions()
    const transactionsQuery = useGetTransactions()
    const deleteTransactions = useBulkDeleteteTransactions()
    const isDisabled = transactionsQuery.isLoading || deleteTransactions.isPaused
    const transactions = transactionsQuery.data || []

    const onSubmitImport = async(
        values:typeof transactionSchema.$inferInsert[],
    )=>{
        const accountId= await confirm()

        if(!accountId){
            return toast.error("Please select an account to continue!")
        }

        const data = values.map((value)=>({
            ...value,
            accountId:accountId as string
        }))

        CreateTransactions.mutate(data,{
            onSuccess:()=>{
                onCancelImport()
            },
            
        })
    }

    const onUpload = (results: typeof INITIAL_IMPORT_RESULT) => {
        console.log({ results })
        setImportResults(results)
        setVariant(VARIANTS.IMPORT)
    }

    const onCancelImport = () => {
        setImportResults(INITIAL_IMPORT_RESULT)
        setVariant(VARIANTS.LIST)
    }

    if (transactionsQuery.isLoading) {
        return (
            <div className=' max-w-screen-2xl mx-auto w-full pb-10 -mt-24 ' >
                <Card className=' border-none drop-shadow-sm '>
                    <CardHeader>
                        <Skeleton className='h-8 w-48 ' />
                    </CardHeader>
                    <CardContent> 
                        <div className='h-[500px] w-full flex items-center justify-center ' >
                            <Loader2 className=' size-6 text-slate-300 animate-spin ' />
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    if (variant === VARIANTS.IMPORT) {
        return (
            <>
                <AccountDialog/>
                <ImportCard data={importResults.data} onCancel={onCancelImport} onSubmit={onSubmitImport} />
            </>
        )
    }
    return (
        <div className=' max-w-screen-2xl mx-auto w-full pb-10 -mt-24 ' >
            <Card className=' border-none drop-shadow-xl '>
                <CardHeader className=' gap-y-2 lg:flex-row lg:items-center lg:justify-between '>
                    <CardTitle className='text-xl line-clamp-1 ' >
                        Transactions History
                    </CardTitle>
                    <div className='flex flex-col lg:flex-row gap-y-2 items-center gap-x-2  '>

                        <Button
                            size='sm'
                            onClick={newTransaction.onOpen}
                            className='w-full lg:w-auto '
                        >
                            <Plus className=' size-4 mr-2  ' />
                            Add new
                        </Button>

                        <UploadButton
                            onUpload={onUpload}
                        />
                    </div>
                </CardHeader>
                <CardContent>
                    <DataTable disabled={isDisabled}
                        filterKey='payee'
                        columns={columns}
                        data={transactions}
                        OnDelete={(row) => {
                            const ids = row.map((r) => r.original.id)
                            deleteTransactions.mutate({ ids })
                        }}
                    />
                </CardContent>
            </Card>
        </div>
    )
}

export default TransactionsPage
