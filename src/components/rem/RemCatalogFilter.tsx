import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

export function RemCatalogFilter ({ name }: { name: string; label: string }) {
  return (
    <Label
      htmlFor={name}
      className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-1'
    >
      <Checkbox id={name} defaultChecked={true} />
      {name}
    </Label>
  )
}
