import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { ChangeEvent, FormEvent, useState } from 'react'
import { toast } from 'sonner'

export function NewNoteCard() {
    const [shouldShowOnboarding, setShoudShowOnboarding] = useState(true)
    const [content, setContent] = useState('')

    function handleStartEditor() {
        setShoudShowOnboarding(false)
    }

    function handleContentChange(event: ChangeEvent<HTMLTextAreaElement>) {
        setContent(event.target.value)

        if (event.target.value === "") {
            setShoudShowOnboarding(true)
        }
    }

    function handleSaveNote(event: FormEvent) {
        event.preventDefault()

        toast.success("Nota salva com sucesso!")
        console.log(content)
    }

    return (
        <Dialog.Root>
            <Dialog.Trigger type="button" className="rounded-md text-left flex flex-col bg-slate-700 p-5 gap-3 overflow-hidden outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
                <span className="text-sm font-medium text-slate-200">
                    Adicionar nota
                </span>
                <p className="text-sm leading-6 text-slate-400">
                    Grave uma nota em áudio que será convertida para texto automaticamente
                </p>
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className='inset-0 fixed bg-black/60' />
                <Dialog.Content className='fixed overflow-hidden left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] h-[60vh] w-full bg-slate-700 rounded-md flex flex-col outline-none'>
                    <Dialog.Close className='absolute right-0 top-0 p-1.5 bg-slate-800 text-slate-400 hover:text-slate-100 focus-visible:text-slate-100 outline-none'>
                        <X className='size-5' />
                    </Dialog.Close>
                    <form onSubmit={handleSaveNote} className='flex-1 flex flex-col'>
                        <div className="flex flex-1 flex-col gap-3 p-5">
                            <span className="text-sm font-medium text-slate-200">
                                Adicionar nota
                            </span>
                            {shouldShowOnboarding ? (
                                <p className="text-sm leading-6 text-slate-400">
                                    Comece <button type='button' className="font-medium text-lime-400 outline-none hover:underline focus-visible:underline">gravando uma nota</button> em áudio ou se preferir <button onClick={handleStartEditor} type='button' className="font-medium text-lime-400 outline-none hover:underline focus-visible:underline">utilize apenas texto</button>.
                                </p>
                            ) : (
                                <textarea title='Digite sua nota'
                                    autoFocus
                                    className='text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none'
                                    onChange={handleContentChange} />
                            )}
                        </div>

                        <button
                            type="submit"
                            className='w-full bg-lime-400 py-4 text-center text-sm text-lime-950 outline-none font-medium hover:bg-lime-500 focus-visible:bg-lime-500'
                        >
                            Salvar nota
                        </button>
                    </form>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}