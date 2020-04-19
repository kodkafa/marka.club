import {inject, observer} from "mobx-react";
import React, {useEffect, useState} from 'react';
import {
  useParams
} from "react-router-dom";
import {Loader} from "../../components";


export const Codes = inject('AccountStore', 'CodeStore')(observer(props => {
  const {code} = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    (async function fetchData() {
      setIsSubmitting(true)
      await props.CodeStore.use(code)
      setIsSubmitting(false)
    })();
  }, [props.CodeStore, code])
  const {type, company, requiredMore, isGotFreebie} = props.CodeStore.info
  //console.log({state, list})
  // const company = {name: 'XXX'}
  // const x = 3

  return <React.Fragment>
    <section className="container text-center">
      <h1 className="h2">Code</h1>
      <div>
        {isSubmitting
          ? <Loader/>
          : <div className="d-flex justify-content-center">
            {type === 'free'
              ? <div className="d-flex justify-content-center align-items-center rounded-circle bg-light"
                     style={{width: 420, height: 420}}>
                <div className="d-flex justify-content-center align-items-center rounded-circle bg-dark"
                     style={{width: 400, height: 400}}>
                  <div className="d-flex justify-content-center align-items-center rounded-circle bg-secondary"
                       style={{width: 360, height: 360}}>
                    <div>
                      <h3 className="h2 text-dark mb-4 font-header font-weight-bold">CODE IS OK!</h3>
                      <p className="h5 mb-4 font-serif font-italic">You can give a freebie!</p>
                      <p className="small">USED CODE:<br/><code>{code}</code></p>
                    </div>
                  </div>
                </div>
              </div>
              : isGotFreebie
                ? <div className="d-flex justify-content-center align-items-center rounded-circle bg-light"
                       style={{width: 420, height: 420}}>
                  <div className="d-flex justify-content-center align-items-center rounded-circle bg-primary"
                       style={{width: 400, height: 400}}>
                    <div className="d-flex justify-content-center align-items-center rounded-circle bg-secondary"
                         style={{width: 360, height: 360}}>
                      <div>
                        <h3 className="h1 text-fourth mb-5 font-header font-weight-bold">YEEEEEY!</h3>
                        <p className="h5 mb-5 font-italic font-serif">You won a new freebie<br/> from
                          <span className="text-primary"> {company && company.name}</span></p>
                        <p className="small">USED CODE:<br/><code>{code}</code></p>
                      </div>
                    </div>
                  </div>
                </div>
                : requiredMore
                  ? <div className="d-flex justify-content-center align-items-center rounded-circle bg-light"
                         style={{width: 420, height: 420}}>
                    <div className="d-flex justify-content-center align-items-center rounded-circle bg-info"
                         style={{width: 400, height: 400}}>
                      <div className="d-flex justify-content-center align-items-center rounded-circle bg-secondary"
                           style={{width: 360, height: 360}}>
                        <div>
                          <h3 className="h2 text-dark mb-4 font-header font-weight-bold">ALMOST DONE!</h3>
                          <p className="h5 mb-4 font-serif font-italic">You need <span
                            className="text-primary">{requiredMore} </span>
                            more trade <br/> with <span className="text-primary">{company && company.name}</span> <br/>for
                            a new freebie!</p>
                          <p className="small">USED CODE:<br/><code>{code}</code></p>
                        </div>
                      </div>
                    </div>
                  </div>
                  : null
            }
          </div>}
      </div>
    </section>
  </React.Fragment>;
}));
