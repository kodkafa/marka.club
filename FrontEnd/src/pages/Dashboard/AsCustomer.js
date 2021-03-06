import {inject, observer} from "mobx-react";
import React, {useEffect, useState} from 'react';

export const Customer = inject('AccountStore', 'CodeStore', 'QRStore')(observer(props => {


  const [code, setCode] = useState(null);
  useEffect(() => {
    props.CodeStore.read()
  }, [props.CodeStore])
  const {state, meta, list} = props.CodeStore
  const {me} = props.AccountStore;
  const {QR} = props.QRStore;
  console.log({state, meta, list})

  const handleGenerate = async (code) => {
    setCode(window.location.origin + "/codes/use/" + code)
    props.QRStore.create(window.location.origin + "/codes/use/" + code)
  }

  const handleClose = () => {
    setCode(null)
  }

  return <React.Fragment>
    <section className="container">
      <div className="d-flex pb-3 mb-3" style={{minHeight: 300}}>
        <div className="flex-grow-1">
          <div className="d-flex mb-3" style={{height: 100}}>
            <div className="card flex-fill p-2 mr-3 bg-secondary text-primary border-0">
              <h4 className="border-bottom border-secondary">FREEBIES</h4>
              <p className="h1 text-right">{meta.freebies - meta.used}/{meta.freebies}</p>
            </div>
            <div className="card flex-fill p-2 bg-primary text-white border-0">
              <h4 className="border-bottom border-primary">USED</h4>
              <p className="h1 text-right">{meta.used}/{meta.freebies}</p>
            </div>
          </div>
          <div className="mb-3 p-2 card h-75 overflow-auto">
            {QR && code
              ? <div className="d-flex flex-column align-items-center justify-content-center d-">
                <div dangerouslySetInnerHTML={{__html: QR}}/>
                <p className="small text-center">
                  You can scan the code or visit the URL below
                  <a className="link d-block p-1" href={code}
                     target="_blank" rel="noopener noreferrer">{code}</a>
                </p>
                <button className="btn btn-secondary" onClick={handleClose}>CLOSE</button>
              </div>
              :
              <table className="table">
                <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Company</th>
                  <th scope="col">Code</th>
                  <th scope="col">Gifted At</th>
                  <th scope="col">Used At</th>
                  <th scope="col">Is used?</th>
                </tr>
                </thead>
                <tbody>
                {list.map((i, k) =>
                  <tr key={i.id} className="small">
                    <th scope="row">{k + 1}</th>
                    <td>{i.company.name}</td>
                    <td>{i.isUsed
                      ? <span className="d-block p-1">{i.code}</span>
                      : <button key={i.id} className="btn-link d-block"
                                onClick={() => handleGenerate(i.code)}>{i.code}</button>}</td>
                    <td>{i.createdAt}</td>
                    <td>{i.updatedAt === i.createdAt ? '-' : i.updatedAt}</td>
                    <td>{i.isUsed ? 'TRUE' : 'FALSE'}</td>
                  </tr>
                )}
                </tbody>
              </table>}
          </div>
        </div>

        <div className="ml-3" style={{maxWidth: 300}}>
          <div className="mb-3 p-2 card h-50 text-muted small">
            <p>Hello <span className="text-primary">{me.first} {me.last}</span>,<br/>
              You logged as a <span className="text-info">{me.role}</span>.</p>
          </div>
        </div>
      </div>
    </section>
  </React.Fragment>;
}));
