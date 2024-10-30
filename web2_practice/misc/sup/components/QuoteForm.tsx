'use client'
import React from 'react'
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";

const QuoteForm = () => {

    const [errors, setErrors] = React.useState<Record<string, string>>({})

    return (
        <form action={() => {
        }} className={'startup-form'}>
            <div>
                <label htmlFor={'title'} className={'startup-form_label'}>
                    Title
                </label>
                <Input id={'title'} name={'title'} className={'startup-form_input'} placeholder={'Insight'}
                       required={true}/>
                {errors.title && <p className={'startup-form_error'}>{errors.title}</p>}
            </div>
            <div>
                <label htmlFor={'description'} className={'startup-form_label'}>
                    Description
                </label>
                <Textarea id={'title'} name={'title'} className={'startup-form_input'} placeholder={'Insight'}
                       required={true}/>
                {errors.title && <p className={'startup-form_error'}>{errors.title}</p>}
            </div>
            <div>
                <label htmlFor={'title'} className={'startup-form_label'}>
                    Title
                </label>
                <Input id={'title'} name={'title'} className={'startup-form_input'} placeholder={'Insight'}
                       required={true}/>
                {errors.title && <p className={'startup-form_error'}>{errors.title}</p>}
            </div>
            <div>
                <label htmlFor={'title'} className={'startup-form_label'}>
                    Title
                </label>
                <Input id={'title'} name={'title'} className={'startup-form_input'} placeholder={'Insight'}
                       required={true}/>
                {errors.title && <p className={'startup-form_error'}>{errors.title}</p>}
            </div>
        </form>
    )
}
export default QuoteForm
