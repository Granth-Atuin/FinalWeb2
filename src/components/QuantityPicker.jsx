export default function QuantityPicker({ value, onChange, min = 1 }) {
return (
<div className="inline-flex items-center gap-2">
<button
className="px-2 py-1 border rounded"
onClick={() => onChange(Math.max(min, value - 1))}
>
-
</button>

<span className="w-8 text-center">{value}</span>

<button
className="px-2 py-1 border rounded"
onClick={() => onChange(value + 1)}
>
+
</button>
</div>
)
}