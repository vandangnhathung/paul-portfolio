import { useMDXComponents as getBlogMDXComponents } from 'nextra-theme-blog'
import { useMDXComponents as getNextraComponents } from 'nextra/mdx-components'
import { Posts } from "@/components/posts";
import { WorkGallery } from '@/components/work-gallery-wrapper';
import { CustomHeader } from '@/components/custom-header';
import { RegistryDemo } from '@/components/registry-demo';
import { RegistryInstall } from '@/components/registry-install';
import { RegistryPropsTable } from '@/components/registry-props-table';

const blogComponents = getBlogMDXComponents({
     h1: ({ children }) => (
          <h1 className="heading-1">
               {children}
          </h1>
     ),
     h2: ({ children }) => (
          <h2 className="heading-2">
               {children}
          </h2>
     ),
     h3: ({ children }) => (
          <h2 className="heading-3">
               {children}
          </h2>
     ),
     DateFormatter: ({ date }) =>
          `Last updated at ${date.toLocaleDateString('en', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
          })}`
})

const defaultComponents = getNextraComponents({
     wrapper({ children, toc }) {
          return (
               <div className="content-wrapper">
                    {children}

                    {/*<TOC toc={toc}/>*/}
               </div>
          )
     }
})

export function useMDXComponents() {
     return {
          ...blogComponents,
          ...defaultComponents,
          Posts: Posts,
          WorkGallery: WorkGallery,
          CustomHeader: CustomHeader,
          RegistryDemo: RegistryDemo,
          RegistryInstall: RegistryInstall,
          RegistryPropsTable: RegistryPropsTable,
     }
}