import type { CollectionAfterChangeHook } from 'payload'

import { revalidatePath } from 'next/cache'

import type { Page } from '../../../payload-types'

export const revalidatePage: CollectionAfterChangeHook<Page> = ({
  doc,
  previousDoc,
  req: { payload, i18n },
}) => {
  const locale = i18n.language
  if (doc._status === 'published') {
    const path = doc.slug === 'home' ? `/${locale}` : `/${locale}/${doc.slug}`

    payload.logger.info(`Revalidating page at path: ${path}`)

    revalidatePath(path)
  }

  // If the page was previously published, we need to revalidate the old path
  if (previousDoc?._status === 'published' && doc._status !== 'published') {
    const oldPath = previousDoc.slug === 'home' ? `/${locale}` : `/${locale}/${previousDoc.slug}`

    payload.logger.info(`Revalidating old page at path: ${oldPath}`)

    revalidatePath(oldPath)
  }

  return doc
}
