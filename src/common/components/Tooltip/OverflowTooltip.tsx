import { Tooltip, TooltipProps, Typography } from '@mui/material'
import { useEffect, useRef, useState } from 'react'

interface PropsI extends Omit<TooltipProps, 'title' | 'children'> {
  text: string
}

export function OverflowTooltip({ text, ...rest }: PropsI) {
  const [isOverflowing, setIsOverflowing] = useState(false)

  // Ref to measure text overflow
  const textRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleResize = () => {
      if (textRef.current) {
        setIsOverflowing(textRef.current.offsetWidth < textRef.current.scrollWidth)
      }
    }

    // Initial check and event listener for window resize
    handleResize()
    window.addEventListener('resize', handleResize)

    // Cleanup event listener on component unmount
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <Tooltip title={isOverflowing ? text : ''} {...rest}>
      <Typography
        variant="body1"
        component="div"
        style={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          maxWidth: '100%',
        }}
        ref={textRef}
      >
        {text}
      </Typography>
    </Tooltip>
  )
}
