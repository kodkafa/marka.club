import {inject, observer} from "mobx-react";
import React from 'react';
import {Company} from './AsCompany'
import {Customer} from './AsCustomer'

export const Dashboard = inject('AccountStore')(observer(props => {

  const {me} = props.AccountStore;

  return me.role === 'company' ? <Company/> : <Customer/>;
}));
