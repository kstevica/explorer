import classNames from 'classnames'
import { Link } from 'react-router-dom'
import Image from 'next/image'
import { InfoCircleOutlined } from '@ant-design/icons'
import Skeleton from '../Common/Skeleton'
import CopyableText from '../Common/CopyableText'
import { Tooltip } from 'antd'

const Widget = ({
  title,
  tooltip,
  value,
  emptyValue = false,
  copyableValue,
  change,
  changeSuffix,
  valueSuffix,
  subtitle,
  onClick,
  icon,
  span = 1,
  isLoading = false,
  linkTo,
  titleIcon,
}) => {
  const inner = (
    <>
      <div className="w-full">
        <div className="flex items-center space-x-1">
          {titleIcon}
          <div className="text-gray-600 text-sm">{title}</div>
          {tooltip && (
            <div className="text-gray-600 text-sm cursor-pointer flex">
              <Tooltip title={tooltip}>
                <InfoCircleOutlined />
              </Tooltip>
            </div>
          )}
        </div>
        <div className="flex items-center">
          {icon && <div className="mr-1.5 flex items-center">{icon}</div>}
          <div className="text-2xl font-medium text-black my-1.5 tracking-tight w-full break-all">
            {isLoading ? (
              <Skeleton className="w-full" />
            ) : (
              <CopyableText textToCopy={copyableValue}>
                <p
                  className={classNames('flex items-center m-0 p-0', {
                    'cursor-pointer hover:text-gray-800 transition-all duration-150': copyableValue,
                    'text-gray-400 text-md font-light': emptyValue,
                  })}
                >
                  <span className="break-all">
                    {value}
                    {valueSuffix && valueSuffix}
                  </span>
                </p>
              </CopyableText>
            )}
          </div>
        </div>
        {change &&
          (isLoading ? (
            <Skeleton className="w-1/4" />
          ) : (
            <div
              className={classNames('text-sm font-medium', {
                'text-green-500': change > 0,
                'text-navy-400': change < 0,
              })}
            >
              {change > 0 ? '+' : ''}
              {change}
              {changeSuffix}
            </div>
          ))}
        {subtitle}
      </div>

      {(onClick || linkTo) && (
        <div className="flex">
          <Image src="/images/details-arrow.svg" width={14} height={14} />
        </div>
      )}
    </>
  )

  if (linkTo && /^https?:\/\//.test(linkTo)) {
    return (
      <a
        href={linkTo}
        target="_blank"
        rel="noopener noreferrer"
        className={classNames(
          'bg-gray-200 p-3 rounded-lg flex transition-all cursor-pointer hover:bg-gray-300',
          {
            'col-span-1': span === 1,
            'col-span-2': span === 2,
          },
        )}
      >
        {inner}
      </a>
    )
  }

  if (linkTo) {
    return (
      <Link
        className={classNames(
          'bg-gray-200 p-3 rounded-lg flex transition-all cursor-pointer hover:bg-gray-300',
          {
            'col-span-1': span === 1,
            'col-span-2': span === 2,
          },
        )}
        to={linkTo}
      >
        {inner}
      </Link>
    )
  }

  return (
    <div
      className={classNames('bg-gray-200 p-3 rounded-lg flex transition-all', {
        'col-span-1': span === 1,
        'col-span-2': span === 2,
        'cursor-pointer hover:bg-gray-300': !!onClick,
      })}
      onClick={onClick}
    >
      {inner}
    </div>
  )
}

export default Widget
