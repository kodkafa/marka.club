import {inject, observer} from "mobx-react";
import React, {useEffect} from 'react';

export const Customer = inject('AccountStore', 'CodeStore')(observer(props => {

  useEffect(() => {
    props.CodeStore.read()
  }, [props.CodeStore])
  const {state, meta, list} = props.CodeStore
  const {me} = props.AccountStore;
  console.log({state, meta, list})

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
                  <th scope="row">{k+1}</th>
                  <td>{i.company.name}</td>
                  <td>{i.isUsed
                    ? <span className="d-block p-1">{i.code}</span>
                    : <a key={i.id} className="link d-block p-1" href={"/codes/use/" + i.code}
                         target="_blank" rel="noopener noreferrer">{i.code}</a>}</td>
                  <td>{i.createdAt}</td>
                  <td>{i.updatedAt === i.createdAt ? '-' : i.updatedAt}</td>
                  <td>{i.isUsed ? 'TRUE' : 'FALSE'}</td>
                </tr>
              )}
              </tbody>
            </table>
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
