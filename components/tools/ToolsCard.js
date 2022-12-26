import { useState, useRef, useEffect } from 'react'
import Heading from '../typography/Heading';
import Paragraph from '../typography/Paragraph';
import Tag from './Tags';
import TextTruncate from 'react-text-truncate';

export default function ToolsCard({ toolData }) {
  const [showDescription, setShowDescription] = useState(false)
  const [showMoreDescription, setShowMoreDescription] = useState(false)
  const descriptionRef = useRef(null)
  useEffect(() => {
    let divHeight = descriptionRef.current.offsetHeight;
    let numberOfLines = divHeight/20;
    if(numberOfLines > 3) setShowMoreDescription(true)
    else setShowMoreDescription(false)
  }, [])

  let onGit = false;
  const url = new URL(toolData.links.repoUrl)
  if (url.host == 'github.com') onGit = true
  else onGit = false

  return (
    <div className="border shadow-md rounded-lg">
      <div className="pt-8 px-6 mb-6">
        <div className="flex flex-col gap-2">
          <div className="flex gap-4 justify-between w-full">
            <Heading typeStyle="heading-sm-semibold">{toolData.title}</Heading>
            <div className='bg-green-100 border border-green-600 text-green-600 p-1 text-center text-xs w-fit h-fit rounded-md'>
              {toolData.filters.hasCommercial === false ? 'Open Source' : 'Commercial'}
            </div>
          </div>
          <div className='relative'>
            <Paragraph typeStyle="body-sm">
              <div ref={descriptionRef} className={`w-full ${showMoreDescription ? 'cursor-pointer': '' }`} onMouseEnter={() =>(setTimeout(() => {if(showMoreDescription) setShowDescription(true)}, 500))}>
              <TextTruncate
                element="span"
                line={3}
                text={toolData.description}
              /></div>
            </Paragraph>
            {showDescription && <div className="absolute top-0 p-2 z-10 bg-white w-full border border-gray-200 shadow-md" onMouseLeave={() => (setShowDescription(false))}>
              <Paragraph typeStyle="body-sm" className=''>
                {toolData.description}
              </Paragraph>
            </div>}
          </div>
        </div>
      </div>
      <hr className="mx-6" />
      {(toolData?.filters?.language || toolData?.filters?.technology?.length>0) &&
        <div className="my-6">
          {toolData.filters.language && <div className="flex flex-col gap-2 mx-6">
            <div className="text-gray-700 text-sm font-semibold">LANGUAGES</div>
            <div className="flex gap-2">
              <Tag
                name={toolData.filters.language.name}
                bgColor={toolData.filters.language.color}
                borderColor={toolData.filters.language.borderColor}
              />
            </div>
          </div>}
          {toolData.filters.technology.length > 0 && <><div className="flex flex-col gap-2 my-4 mx-6">
            <div className="text-gray-700 text-sm font-semibold">TECHNOLOGIES</div>
            <div className="flex gap-2 flex-wrap">
              {toolData.filters.technology.map((item, index) => (
                <Tag key={index}
                  name={item.name}
                  bgColor={item.color}
                  borderColor={item.borderColor}
                />
              ))}
            </div>
          </div></>}
        </div>}
      {(toolData.links.repoUrl || toolData.links.websiteUrl) && <>
        <hr className="" />
        <div className="flex">
          {onGit ?
            <a className="w-full text-center py-6 hover:bg-gray-200 cursor-pointer" href={toolData.links.repoUrl} target='_blank' rel='noreferrer'>
              <div className="m-auto flex w-fit gap-2">
                <img src="/img/logos/github-black.svg" className="w-5" />
                <div className="text-gray-700 text-sm">View on Github</div>
              </div>
            </a> :
            <a className="w-full text-center py-6 hover:bg-gray-200 cursor-pointer" href={toolData.links.repoUrl} target='_blank' rel='noreferrer'>
              <div className="m-auto flex w-fit gap-2">
                <div className="text-gray-700 text-sm">View Source Code</div>
              </div>
            </a>
          }
          {toolData.links.websiteUrl && (
            <>
              <div className='border border-gray-200 h-auto'></div>
              <a className="w-full text-center py-6 hover:bg-gray-200 cursor-pointer" href={toolData.links.repoUrl} target='_blank' rel='noreferrer'>
                <div className="m-auto flex w-fit gap-2">
                  <img src="/img/illustrations/icons/share.svg" className="w-5" />
                  <div className="text-gray-700 text-sm">Visit Website</div>
                </div>
              </a>
            </>
          )}
        </div>
      </>}
    </div>
  );
}