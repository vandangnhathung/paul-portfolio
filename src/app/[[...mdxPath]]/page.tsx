import { generateStaticParamsFor, importPage } from 'nextra/pages'
import type { Heading } from 'nextra'
import { useMDXComponents as getMDXComponents } from '../../../mdx-components'
import type { Metadata } from 'next'
import React from "react";
import { PostDetail } from "@/components/post-detail";
import { FrontMatter } from "@/lib/get-posts";
import { notFound } from 'next/navigation';

// Define types for params and metadata
type PageParams = {
    mdxPath: string[]
}

type PageProps = {
    params: Promise<PageParams>
}

export const generateStaticParams = generateStaticParamsFor('mdxPath')

export async function generateMetadata(props: PageProps): Promise<Metadata> {
    const params = await props.params
    // Exclude static files like favicon.ico, robots.txt, etc.
    const staticFileExtensions = ['.ico', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.txt', '.xml', '.json']
    const pathString = params.mdxPath?.join('/') || ''
    if (staticFileExtensions.some(ext => pathString.endsWith(ext))) {
        return {}
    }
    
    try {
        const { metadata } = await importPage(params.mdxPath)
        return metadata
    } catch (error) {
        return {}
    }
}

const Wrapper = getMDXComponents().wrapper

export default async function Page(props: PageProps) {
    const params = await props.params
    // Exclude static files like favicon.ico, robots.txt, etc.
    const staticFileExtensions = ['.ico', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.txt', '.xml', '.json']
    const pathString = params.mdxPath?.join('/') || ''
    if (staticFileExtensions.some(ext => pathString.endsWith(ext))) {
        notFound()
    }
    
    let result
    try {
        result = await importPage(params.mdxPath)
    } catch (error) {
        notFound()
    }
    
    const { default: MDXContent, toc, metadata } = result as {
        default: React.ComponentType<Record<string, unknown>>
        toc: Heading[]
        metadata: Metadata
    }

    const isPostPage = params.mdxPath && params.mdxPath.length > 1 && params.mdxPath.includes('posts');

    return (
        // @ts-expect-error - This is a valid type
        <Wrapper toc={toc} metadata={metadata}>
            {
                isPostPage &&
                <PostDetail metadata={metadata as FrontMatter}>
                    <MDXContent {...props} params={params} />
                </PostDetail>
            }

            {
                !isPostPage &&
                <>
                    <MDXContent {...props} params={params} />
                </>
            }

        </Wrapper>
    )
}