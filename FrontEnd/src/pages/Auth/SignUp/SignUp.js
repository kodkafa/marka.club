import {inject, observer} from 'mobx-react';
import React, {useState} from 'react';
import {useHistory} from 'react-router';
import {useForm} from 'react-hook-form';
import {Link} from 'react-router-dom';
import * as Yup from 'yup';

export const SignUp = inject('AccountStore')(observer((props) => {

  const schema = Yup.object().shape({
    email: Yup.string().email('Please write a correct email address').required('Email is required'),
    password: Yup.string().min(8, 'Password must be 8 characters or longer')
      .matches(/[a-z]/, 'Password must contain at least one lowercase char')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase char')
      .matches(/[a-zA-Z]+[^a-zA-Z\s]+/, 'at least 1 number or special char (@,!,#, etc).'),
    // username: Yup.string().matches(/^[A-Za-z0-9]+(?:[._-][A-Za-z0-9]+)*$/, 'Username only contain english characters and (_,-,.). Also usernames must start and end with a letter or number.')
    //   .required('Username is required'),
    last: Yup.string().required('Surname is required'),
    first: Yup.string().required('Name is required'),
  })


  const {register, handleSubmit, errors, watch} = useForm({
    validationSchema: schema
  });
  const role = watch("role");
  const freeRate = watch("freeRate");
  const history = useHistory();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async data => {
    setIsSubmitting(true);
    if (await props.AccountStore.create(data)) {
      history.push('/signin');
    } else setIsSubmitting(false);
  }

  const {authenticated} = props.AccountStore;
  if (authenticated) {
    const location = localStorage.getItem('location');
    props.history.push(location || '/dashboard');
  }
  return (
    <div className="row justify-content-md-center">
      <section className="cover  bg-light">
        <div className="container">
          <div className="row h-100 justify-content-md-center">
            <div className="col-sm-4 my-auto">
              <form className="card border-0 p-4 shadow" onSubmit={handleSubmit(onSubmit)}>
                <h1 className="h4 lined"><span>SIGN UP</span></h1>
                <fieldset className="form-group">
                  <label className="small">Email</label>
                  <input className="form-control" type="text" name="email" placeholder="email@email.com"
                         ref={register()}/>
                  {errors.email &&
                  <small className="form-text text-danger">{errors.email.message}</small>}
                </fieldset>
                <div className="row">
                  <fieldset className="col-md-6 form-group">
                    <label className="small">Name</label>
                    <input className="form-control" type="text" name="first" placeholder="Name" ref={register()}/>
                    {errors.first &&
                    <small className="form-text text-danger">{errors.first.message}</small>}
                  </fieldset>
                  <fieldset className="col-md-6 form-group">
                    <label className="small">Surname</label>
                    <input className="form-control" type="text" name="last" placeholder="Surname" ref={register()}/>
                    {errors.last &&
                    <small className="form-text text-danger">{errors.last.message}</small>}
                  </fieldset>
                </div>
                <fieldset className="form-group">
                  <label className="small">Password</label>
                  <input className="form-control" type="password" name="password" placeholder="Password"
                         ref={register()}/>
                  {errors.password &&
                  <small className="form-text text-danger">{errors.password.message}</small>}
                </fieldset>

                <fieldset className="form-group">
                  <label className="small">Role</label>
                  <div className="text-center">
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" name="role" value="customer" id="customer"
                             defaultChecked={true}
                             ref={register()}/>
                      <label className="form-check-label" htmlFor="customer">Customer</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" name="role" value="company" id="company"
                             ref={register()}/>
                      <label className="form-check-label" htmlFor="company">Company</label>
                    </div>
                  </div>
                </fieldset>
                {role === 'company' &&
                <div>
                  <fieldset className="form-group">
                    <label className="small">Company Name</label>
                    <input className="form-control" type="text" name="company" placeholder="MARKA" ref={register()}/>
                    {errors.company &&
                    <small className="form-text text-danger">{errors.company.message}</small>}
                  </fieldset>
                  <fieldset className="form-group">
                    <label className="small">Free Rate (1/<span>{freeRate || 5}</span>)</label>
                    <input className="form-control" type="range" min={1} max={10} name="freeRate" defaultValue={5}
                           step={1} ref={register()}/>
                  </fieldset>
                </div>}
                {/*{status && status.success && <div className="alert alert-success">*/}
                {/*  <small>{status.success}</small>*/}
                {/*</div>}*/}
                <p className="text-muted text-center small">By creating an account, you agree to our <Link
                  to="/tos">Terms of Service</Link>&nbsp;
                  and <Link to="/privacy">Privacy Policy</Link>.
                </p>
                <button className="btn btn-primary w-100" type="submit" disabled={isSubmitting}>
                  {isSubmitting && <span><i className="fa fa-circle-notch fa-spin"/>&nbsp;</span>}
                  Create my account
                </button>
                <p className="pt-4 text-center small">You can <Link to="/signin">sign in</Link> if you have an
                  account
                  already.</p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>);
}))
