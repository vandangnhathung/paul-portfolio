"use client"

import React from "react"

/**
 * Component description goes here.
 * This is a reusable component template for the registry system.
 * 
 * @see https://your-api-docs-url.com for API documentation
 */
export interface ScrollingSectionsProps {
  /** Description of the prop */
  exampleProp?: string
}

/**
 * ScrollingSections - Brief description of what this component does
 * 
 * @param props - Component props
 * @returns JSX element
 */
export function ScrollingSections({ exampleProp = "default value" }: ScrollingSectionsProps) {
  return (
    <div className="p-4">
      <h1>Scrolling Sections</h1>
      <p>{exampleProp}</p>
    </div>
  )
}

