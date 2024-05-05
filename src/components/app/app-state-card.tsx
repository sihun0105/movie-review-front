import { FunctionComponent } from 'react'
interface AppStateCardProps {}

const AppStateCard: FunctionComponent<AppStateCardProps> = ({}) => {
  return (
    <div className="stats shadow">
      <div className="stat place-items-center">
        <div className="stat-title">Downloads</div>
        <div className="stat-value">31K</div>
        <div className="stat-desc">From January 1st to February 1st</div>
      </div>

      <div className="stat place-items-center">
        <div className="stat-title">Users</div>
        <div className="stat-value text-primary">4,200</div>
        <div className="stat-desc text-primary">↗︎ 40 (2%)</div>
      </div>

      <div className="stat place-items-center">
        <div className="stat-title">New Registers</div>
        <div className="stat-value">1,200</div>
        <div className="stat-desc">↘︎ 90 (14%)</div>
      </div>
    </div>
  )
}

export default AppStateCard
