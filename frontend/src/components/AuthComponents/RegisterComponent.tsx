import { Button } from '@mui/material';
import { useForm, Resolver } from 'react-hook-form'

type FormValues = {
    username: string;
    email: string;
    password: string;
}

const resolver: Resolver<FormValues> = async (values) => {
    return {
        values: values.username && values.email && values.password ? values : {},
        errors: !values.username ? {
            username: {
                type: "required",
                message: "Username is required."
            }
        } : !values.email ? {
            email: {
                type: 'required',
                message: 'Email is required.'
            }
        } : !values.password ? {
            password: {
                type: 'required',
                message: "Password is required."
            }
        } : {}
    }
}

const RegisterComponent = () => {

    const { handleSubmit, register, formState: { errors } } = useForm<FormValues>({ resolver })

    const onSubmit = (data: FormValues) => {
        console.log({ data })
    }

    return (
        <section>
            <div className="register-form">
                <h1 className='underline'>Register</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="input-field">
                        <label htmlFor="username">Username</label>
                        <input type="text" {...register("username")} placeholder='John Doe' />
                    </div>
                    {errors?.username ? <p className='error'>{errors?.username?.message}</p> : null}
                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input type="text" {...register('email')} placeholder='johndoe@domain.com' />
                    </div>
                    {errors?.email ? <p className='error'>{errors?.email?.message}</p> : null}
                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" {...register('password')} placeholder='************' />
                    </div>
                    {errors?.password ? <p className='error'>{errors?.password?.message}</p> : null}

                    <Button type="submit" variant='contained'>Submit</Button>
                </form>
            </div>
        </section>
    )
}

export default RegisterComponent