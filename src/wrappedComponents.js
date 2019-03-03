import React, { Suspense } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import { withMain } from './HOC/withMain'
import HomeComponent from './views/Home'
import BillsComponent from './views/Bills/Bills'
import CreateBillComponent from './views/Bills/CreateBill'
import EditBillComponent from './views/Bills/EditBill'
import BusinessComponent from './views/Business/Business'
import CreateBusinessComponent from './views/Business/CreateBusiness'
import EditBusinessComponent from './views/Business/EditBusiness'

function WaitingComponent(Component) {
  return props => (
    <Suspense
      fallback={
        <CircularProgress
          size={80}
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            marginTop: '-80px',
            marginLeft: '-80px'
          }}
        />
      }
    >
      <Component {...props} />
    </Suspense>
  )
}

const LoginComponent = React.lazy(() =>
  import('./views/Login' /* webpackChunkName: "login" */)
)

export const Login = WaitingComponent(withMain(LoginComponent))
export const Home = withMain(HomeComponent)

/* BILLS */
export const Bills = withMain(BillsComponent)
export const EditBill = withMain(EditBillComponent)
export const CreateBill = withMain(CreateBillComponent)

/* BUSINESS */
export const Business = withMain(BusinessComponent)
export const CreateBusiness = withMain(CreateBusinessComponent)
export const EditBusiness = withMain(EditBusinessComponent)
