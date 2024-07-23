import React from 'react'
import { useForm } from 'react-hook-form'
import emailjs from 'emailjs-com'

export const Contact = () => {
  const {
    register, handleSubmit, formState: { errors }
  } = useForm({
    criteriaMode: "all",
    defaultValues: {
      name: '',
      email: '',
      text: ''
    }
  });

  const submitEmail = async (data) => {
    const serviceId = process.env.VITE_EMAIL_SERVICE_ID;
    const templateId = process.env.VITE_EMAIL_TEMPLATE_ID;
    const publicId = process.env.VITE_EMAIL_PUBLIC_ID;

    try {
      await emailjs.send(serviceId, templateId, data, publicId)
      alert('お問い合わせありがとうございました')
    } catch (errors) {
      console.log(errors)
    }
  }

  return (
    <>
      <div className='allheight'>
        <div className='headline'>お問い合わせ</div>
        <form onSubmit={handleSubmit(submitEmail)}>
          <div className='contact-table'>
            <div className='contact-item'>お名前</div>
            <div className='contact-body'>
              <input
                {...register("name", {
                  required: '必須項目です',
                  maxLength: {
                    value: 15,
                    message: '15文字以内で入力してください'
                  }
                })}
                type="text" title="name" className='txt'
              />
              {errors.name && <p>{errors.name.message}</p>}
            </div>

            <div>
              <div className='contact-item'>メールアドレス</div>
              <div className='contact-body'>
                <input
                  {...register('email', {
                    required: '必須項目です',
                    pattern: {
                      value: /^[A-Z0-9.%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: '正しいメールアドレスの形式で入力してください'
                    }
                  })}
                  type="email" title="email" className='txt'
                />
                {errors.email && <p>{errors.email.message}</p>}
              </div>
            </div>
            <div className='contact-item'>ご依頼内容</div>
            <div className='contact-body'>
              <textarea name="details" id="details" rows={5} cols={40} title='details' className='details'
                {...register("text", {
                  required: '必須項目です',
                  maxLength: {
                    value: 200
                  }
                })}></textarea>
              {errors.text && <p>{errors.text.message}</p>}
            </div>
          </div>
          <input type='submit' className='contact-submit' value={'送信'} />
        </form>
      </div>
    </>
  )
}
